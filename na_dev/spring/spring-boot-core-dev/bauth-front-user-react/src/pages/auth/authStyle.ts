

export const mainStyle = {
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {        
        padding: '0 24px',
        width: '100%',
        maxWidth: '400px',
    }
};

export const logo = {
    marginBlock: 0,
    marginBottom: 5,
    display: 'block',
    width: 172,
    height: 50,
    fontSize: 0,
}
export const buttonStyle = {
    '& button, a': {
        marginTop: 2,
        alignItems: 'center',
        height: '48px',
        lineHeight: '1',
        color: '#212B36',
        fontWeight: '700',
        '& div:first-of-type': {
            flex: 1,
            display: 'inline-flex', 
        },
        '& div:nth-of-type(2)': {
            flex: 8, 
            textAlign: 'center', 
            marginRight: 5, 
        },
    },
};

export const content = {
    overflowY: 'auto',
    height: 'calc((var(--vh, 1vh) * 100) - 52px)',
    '& > div:first-of-type': {
        height: 'calc((var(--vh, 1vh) * 100) - 144px)',
        padding: '32px 24px',
    },
    '& > div:nth-of-type(2)': {
        padding: '20px 24px',
        display: 'flex',
        gap: 1,
        flexDirection: 'row',
        '& div': {
            flex: 1,
        }
    },
    '& a': {
        fontSize: '1rem',
        color: '#666',
        textDecoration: 'none',
    },
    '& input': {
        padding: '14.5px 14px',
    }
}
export const title = {
    marginBottom: 2,
    lineHeight: '1.5',
    fontSize: '1.5rem'
}
export const btnSubmit = {
    height: '52px',
    lineHeight: 'normal',
    fontSize: '1.125rem',
    fontWeight: '700',
}