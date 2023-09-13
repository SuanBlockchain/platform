import React from 'react';
import { TelegramIcon } from './icons/TelegramIcon';

export default function TelegramFloatingButton() {
  const telegramLink = 'https://t.me/TuCanalDeTelegram'; // Reemplaza con el enlace de tu canal de Telegram

  const handleClick = () => {
    window.open(telegramLink, '_blank');
  };

  return (
    <div className="telegram-button" style={{position:"fixed", bottom: "40px", right: "20px"}}>
      <button onClick={handleClick} style={{
        backgroundColor: "#",
        background:"linear-gradient(#36AEE0, #1C96D1)",
        width: "50px",
        borderRadius:"50%",
        height: "50px",
        border: "none"
      }}>
        <TelegramIcon/>
      </button>
    </div>
  );
}
