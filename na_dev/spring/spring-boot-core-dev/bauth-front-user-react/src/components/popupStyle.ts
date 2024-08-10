export const altStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: "28px",
    width: 'calc(100% - 56px)',
    maxWidth: 400,
    background: '#fff',
    transform: 'translate(calc(-50% - 28px), calc(-50% - 28px))',
    borderRadius: 1,
    boxShadow: 24,
    '& .MuiAlert-root': {
        padding: 2,
        fontSize: '1.125rem',
        color: '#111',
        wordBreak: 'break-all',
        bgcolor: 'background.paper',
        borderRadius: '4px 4px 0 0',
        '& .MuiAlert-message': {
            padding: '5px 0',
        },
        '& .MuiAlert-icon': {
            '& svg[data-testid="InfoOutlinedIcon"]': {
                fill: '#111',
            },
            '& svg[data-testid="ErrorOutlineIcon"]': {
            fill: '#EF2B2A',
            },
            '& svg[data-testid="SuccessOutlinedIcon"]': {
                fill: '#006C9C',
            },
            '& svg[data-testid="ReportProblemOutlinedIcon"]': {
                fill: '#B76E00',
            },
        },
    },
};

export const confirm = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: "28px",
    width: 'calc(100% - 56px)',
    maxWidth: 400,
    background: '#fff',
    transform: 'translate(calc(-50% - 28px), calc(-50% - 28px))',
    borderRadius: 1,
    boxShadow: 24,
    '& .MuiAlert-root': {
        padding: 2,
        color: '#111',
        fontSize: '1.125rem',
        wordBreak: 'break-all',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderRadius: '4px 4px 0 0',
        '& .MuiAlert-icon': {
            display: 'none',
        },
        '& .MuiAlert-message': {
            padding: '5px 0',
        },
    },
};
export const modal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: "28px",
    width: 'calc(100% - 56px)',
    maxWidth: 600,
    '@media (max-width:550px)': {
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        borderRadius: 0,
    },
    bgcolor: 'background.paper',
    transform: 'translate(calc(-50% - 28px), calc(-50% - 28px))',
    borderRadius: 1,
    boxShadow: 24,
    '& > .MuiBox-root': {
        position: 'relative',
        '& h1': {
            fontSize: '1.75rem',
            lineHeight: 1.8,
            fontWeight: '700',
            paddingY: 1,
            paddingX: 3,
        },
        '& > .MuiStack-root': {            
            '& > .MuiBox-root': {
                marginX: 3,
                paddingY: 2,
                border: 'solid #bfbfbf',
                borderWidth: '1px 0',
                '@media (max-width:550px)': {
                    marginX: 0,
                    paddingX: 3,
                    height: 'calc((var(--vh, 1vh) * 100) - 164px)',
                },
            }
        },
        '& > .MuiIconButton-root': {
            position: 'absolute',
            top: 15,
            right: 15,    
            padding: 0,
            '& svg': {
                fill: '#111',
            } 
        },
    },
};
export const btnAlt = { 
    flexDirection: 'row',
    justifyContent: 'end',
    gap: 1,
    paddingY: 2,
    paddingX: 3,
};

export const btnModal = { 
    flexDirection: 'row',
    justifyContent: 'end',
    gap: 1,
    padding: 3,
    '@media (max-width:550px)': {
        gap: 2,
        '& button': {
            flex: 1,
            padding: '11.5px 16px',
            fontSize: '1.125rem',
            lineHeight: 'normal',
        }
    },
};
