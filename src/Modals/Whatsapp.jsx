import React from 'react';
// This is the way to import an SVG file and then pass it as a props
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

const whatsapp = () => {
    return (
        <>
            <WhatsAppWidget 
                                            companyName="Vezüve Destek Hattı"
                                            phoneNumber="+905334519575"
                                            message="Size Nasıl Yardımcı Olabiliriz?"
                                            replyTimeText=""
                                            sendButtonText="GÖNDER"
                                            inputPlaceHolder="Mesajınızı giriniz."
                                        />
        </>
    );
};
export default whatsapp;