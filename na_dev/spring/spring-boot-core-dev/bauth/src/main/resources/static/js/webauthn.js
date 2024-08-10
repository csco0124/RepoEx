
function createCredential(residentKeyRequirement){

    let username = $("#userEmail").val();
    let userHandle = $("#userHandle").val();

    return $.get('/webauthn/attestation/options', null, null, "json").then(options => {
        let allowCredentialsArray = [];
        $('[name^=authenticatorItem]').each(function () {
            let credentialId = $(this).find('[name=credentialId]').val();
            let credentialType = $(this).find('[name=credentialType]').val();

            if (credentialType === "") {
                credentialType = options.excludeCredentials
                    .filter(credential => credential.id === credentialId)
                    .map(credential => credential.type);
            }

            allowCredentialsArray.push(
                {
                    "id": base64url.decodeBase64url(credentialId),
                    "type": credentialType
                }
            );
        });

        let publicKeyCredentialCreationOptions = {
            rp: {
                id: options.rp.id,
                name: options.rp.name
            },
            user: {
                id: base64url.decodeBase64url(userHandle),
                name: username,
                displayName: username
            },
            challenge: base64url.decodeBase64url(options.challenge),
            pubKeyCredParams: options.pubKeyCredParams,
            timeout: options.timeout,
            excludeCredentials: allowCredentialsArray,
            authenticatorSelection: {
                authenticatorAttachment: options.authenticatorSelection.authenticatorAttachment,
                requireResidentKey: residentKeyRequirement,
                residentKey: options.authenticatorSelection.residentKey,
                userVerification: options.authenticatorSelection.userVerification
            },
            attestation: options.attestation,
            extensions: options.extensions
        };

        let credentialCreationOptions = {
            publicKey: publicKeyCredentialCreationOptions
        };

        return navigator.credentials.create(credentialCreationOptions);
    });
}

function getCredential(userVerification){
    return $.get('/webauthn/assertion/options', {'email': localStorage.getItem('email')}, null, "json").then(options => {
        let publicKeyCredentialRequestOptions = {
            challenge: base64url.decodeBase64url(options.challenge),
            timeout: options.timeout,
            rpId: options.rpId,
            allowCredentials: options.allowCredentials.map(credential => {
                return {
                    type: credential.type,
                    id: base64url.decodeBase64url(credential.id)
                }
            }),
            userVerification: userVerification,
            extensions: options.extensions
        };

        let credentialRequestOptions = {
            publicKey: publicKeyCredentialRequestOptions
        };

        return navigator.credentials.get(credentialRequestOptions);
    });
}

$(document).ready(function() {
	webauthn.init();
	webauthn.eventBinding();
});
const webauthn = {
	dialog : $("#resident-key-requirement-dialog"),
	init(){
	    if($('#login-authenticator-login-view').length>0){
	        return getCredential("preferred").then(function (credential) {
	            console.log(credential);
	            $("#credentialId").val(credential.id);
	            $("#clientDataJSON").val(base64url.encodeBase64url(credential.response.clientDataJSON));
	            $("#authenticatorData").val(base64url.encodeBase64url(credential.response.authenticatorData));
	            $("#signature").val(base64url.encodeBase64url(credential.response.signature));
	            $("#clientExtensions").val(JSON.stringify(credential.getClientExtensionResults()));
	            $('#login-form').submit();
	        }).catch(function (e) {
	            console.error("Error:%s, Message:%s", e.name, e.message);
	        });
	    }
	},
    eventBinding(){
		$('#resident-key-requirement-dialog-yes').click(function () {
	        webauthn.onResidentKeyRequirementDialogClosing(true);
	    });
	    $('#resident-key-requirement-dialog-no').click(function () {
	        webauthn.onResidentKeyRequirementDialogClosing(false);
	    });
	    $('#resident-key-requirement-dialog-close').click(function () {
	        webauthn.dialog.modal('hide');
	    });
	
	    $('#webAuthnLoginBtn').click(function(){
	        getCredential("required").then(function (credential) {
	            console.log(credential);
	            $("#credentialId").val(credential.id);
	            $("#clientDataJSON").val(base64url.encodeBase64url(credential.response.clientDataJSON));
	            $("#authenticatorData").val(base64url.encodeBase64url(credential.response.authenticatorData));
	            $("#signature").val(base64url.encodeBase64url(credential.response.signature));
	            $("#clientExtensions").val(JSON.stringify(credential.getClientExtensionResults()));
	            $('#webauthnForm').submit();
	        }).catch(function (e) {
	            console.error("Error:%s, Message:%s", e.name, e.message);
	        });
	        return false;
	    });
	    $('#retry').click(function(){
	        getCredential("preferred").then(function (credential) {
	            console.log(credential);
	            $("#credentialId").val(credential.id);
	            $("#clientDataJSON").val(base64url.encodeBase64url(credential.response.clientDataJSON));
	            $("#authenticatorData").val(base64url.encodeBase64url(credential.response.authenticatorData));
	            $("#signature").val(base64url.encodeBase64url(credential.response.signature));
	            $("#clientExtensions").val(JSON.stringify(credential.getClientExtensionResults()));
	            $('#login-form').submit();
	        }).catch(function (e) {
	            console.error("Error:%s, Message:%s", e.name, e.message);
	        });
	        return false;
	    });
	
	},
    // return Promise
    onResidentKeyRequirementDialogClosing(residentKeyRequirement){
        return createCredential(residentKeyRequirement).then(function (credential) {
            console.log(credential);
            return {
                credentialId: base64url.encodeBase64url(credential.rawId),
                clientDataJSON: base64url.encodeBase64url(credential.response.clientDataJSON),
                attestationObject: base64url.encodeBase64url(credential.response.attestationObject),
                clientExtensions: JSON.stringify(credential.getClientExtensionResults()),
                type : credential.type
            }
        }).catch(function (e) {
            console.error("Error:%s, Message:%s", e.name, e.message);
        });
    },
    addAuthenticatorClick(){
        webauthn.onResidentKeyRequirementDialogClosing(true).then(function (credential) {
            console.log(credential);
            let authenticator = $('#authenticatorItemCloneObject').clone(true);
            let idx = $('[name^=authenticatorItem]').length;
            authenticator.show();
            authenticator.attr('name', 'authenticatorItem' + idx);
            authenticator.find('[name=authenticatorName]').text('authenticator' + (idx + 1));
            authenticator.find('[name=credentialId]').val(credential.credentialId);
            authenticator.find('[name=clientDataJSON]').val(credential.clientDataJSON);
            authenticator.find('[name=attestationObject]').val(credential.attestationObject);
            authenticator.find('[name=clientExtensions]').val(credential.clientExtensions);
            authenticator.find('[name=credentialType]').val(credential.type);

            $('#noDataRows').remove();

            $('#authenticatorList').append(authenticator);
        });
    }
}
