import React, { Component } from "react";

class NavBar extends Component {
    render() {
        const { changeScreen, toggleSearchPopup, currentScreen, searchParams, onLogout } = this.props;

        let title = 'Libri disponibili';
        if (currentScreen === 2) {
            title = 'Carrello';
        } else if (currentScreen === 3) {
            title = 'Libri trovati';
            if (searchParams.keyword || searchParams.category) {
                title += ' per: ';
                if (searchParams.keyword) {
                    title += `${searchParams.keyword}`;
                }
                if (searchParams.category) {
                    title += `${searchParams.keyword ? ' e ' : ''}${searchParams.category}`;
                }
            }
        } else if (currentScreen === 4) {
            title = 'Libri in prestito';
        }

        const buttonStyle = {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '30px',
            marginRight: '10px',
        };

        const activeButtonStyle = {
            ...buttonStyle,
            backgroundColor: '#ADD8E6' // Colore azzurro per il bottone attivo
        };

        return (
            <header className="home-header">
                <div className="left-buttons" style={{ flex: '1' }}>
                    <button className="search-button" onClick={toggleSearchPopup} style={buttonStyle}>
                        <i className="fas fa-search icon-large"></i>
                    </button>
                </div>
                <div className="title">
                    {title}
                </div>
                <div className="right-buttons" style={{ flex: '1', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <button
                        className="prestito-button"
                        onClick={() => changeScreen(4)}
                        disabled={currentScreen === 4}
                        style={currentScreen === 4 ? activeButtonStyle : buttonStyle}
                    >
                        Libri in prestito
                    </button>
                    <button
                        className="home-button"
                        onClick={() => changeScreen(1)}
                        disabled={currentScreen === 1}
                        style={currentScreen === 1 ? activeButtonStyle : buttonStyle}
                    >
                        Home
                    </button>
                    <button
                        className="carrello-button"
                        onClick={() => changeScreen(2)}
                        disabled={currentScreen === 2}
                        style={currentScreen === 2 ? activeButtonStyle : buttonStyle}
                    >
                        Carrello
                    </button>
                    <button className="logout-button" onClick={onLogout} style={buttonStyle}>
                        <i className="fas fa-sign-out-alt icon-large"></i>
                    </button>
                </div>
            </header>
        );
    }
}

export default NavBar;
