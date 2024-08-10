package com.narui.democlienta.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.util.Assert;

public class CustomGrantedAuthority implements GrantedAuthority {

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    private final String role;
    private final String name;

    public CustomGrantedAuthority(String role, String name) {
        Assert.hasText(role, "A granted authority textual representation is required");
        this.role = role;
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return this.role;
    }

    public String getName() { return this.name; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj instanceof CustomGrantedAuthority) {
            return this.role.equals(((CustomGrantedAuthority) obj).role);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.role.hashCode();
    }

    @Override
    public String toString() {
        return this.role;
    }
}
