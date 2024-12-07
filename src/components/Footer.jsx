import React from 'react'

const Footer = () => {
    return (
        <div style={{ fontSize: "20px", fontWeight: "bolder", marginTop: "10px"}}>
            &copy; {new Date().getFullYear()}{" "}
            <a style={{ textDecoration: "none" }} href="https://github.com/muhammedadil1024">
                Muhammed Adil
            </a>
        </div>
    );
}

export default Footer