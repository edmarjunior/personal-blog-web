import React from "react";
import { Card } from "../../components/Card/styles";
import { Content } from "./styles";
import meuAvatar from "../../assets/me.jpg";

export default function About() {
    return (
        <Card>
            <Content>
                <img src={meuAvatar} alt="foto perfil edmar" />
                <strong>Edmar Costa</strong>
                <span>Software Developer at <a target="_blank" rel="noopener noreferrer " href="https://smn.com.br/">SMNTI</a></span>
                <span>Franca, São Paulo, Brasil</span>
            </Content>
        </Card>
    );
}