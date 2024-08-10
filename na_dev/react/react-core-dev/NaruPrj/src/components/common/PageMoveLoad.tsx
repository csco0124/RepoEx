import logo from '../../resources/images/common/logo.png';

const PageMoveLoad = () => {
    const imgSrc = {
        'width' : '136px',
        'height' : '39px'
    }

    return (
        <div style={{
            left : 0,
            top : 0,
            position : 'fixed',
            width : '100%',
            height : '100%',
            backgroundColor : 'white',
            zIndex : '9999'
        }}>
            <img src={logo} style={{
                position : 'absolute',
                top : '50%',
                left : '50%'
            }}/>
        </div>
    );
};

export default PageMoveLoad;