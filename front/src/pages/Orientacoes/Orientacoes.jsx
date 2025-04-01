import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { House, Heart, Utensils, Bug, Trash2, ShieldCheck, GlassWater, Bone, Phone, TriangleAlert, ChevronRight } from "lucide-react";
import CallToAction from '../../components/CallToAction/CallToAction';
import "./orientacoes.css";

function Orientacoes () {
    return (
    <>
    <div className="container-orientacoes">
      {/* Header */}
      <div className="header-orientacoes">
        <h1>Guia de Segurança contra Enchentes</h1>
        <p className="subtitle">
          Saiba exatamente o que fazer antes, durante e depois das chuvas intensas 
          <br />para proteger você e sua família
        </p>

        <div className="button-container">
          <button className="btn btn-amarelo" onClick={() => document.getElementById('antes-enchente').scrollIntoView({ behavior: 'smooth' })}>ANTES DA ENCHENTE <ChevronRight /></button>
          <button className="btn btn-laranja" onClick={() => document.getElementById('durante-enchente').scrollIntoView({ behavior: 'smooth' })}>DURANTE A ENCHENTE <ChevronRight /></button>
          <button className="btn btn-azul" onClick={() => document.getElementById('depois-enchente').scrollIntoView({ behavior: 'smooth' })}>DEPOIS DA ENCHENTE <ChevronRight /></button>
        </div>
      </div>

      {/* Antes da enchente */}
      <div>
        {/* Preparação da Casa */}
        <div className="section-header-amarelo" id="antes-enchente">
          <h2>Preparação e Prevenção</h2>
        </div>
        <div className="content-preparacao">
          <h2>
            <House className="icon-amarelo" />
            Preparação da Casa
          </h2>
          <div className="section-content">
            <ul>
              <li>Vede as soleiras das portas e janelas para evitar a entrada de animais noturnos;</li>
              <li>Vede os buracos entre as telhas, as paredes e os rodapés;</li>
              <li>Use telas em ralos do chão, pias e tanques;</li>
              <li>Verifique e limpe todos os ralos semanalmente, mantendo-os tampados quando não em uso.</li>
            </ul>
          </div>
        
        {/* Saúde */}
        <div className="section">
          <h2>
            <Heart className="icon-amarelo" />
            Saúde
          </h2>
          <div className="section-content">
            <ul>
              <li>Prepare um kit de primeiros socorros;</li>
              <li>Tenha medicamentos essenciais para todos os membros da família;</li>
              <li>Mantenha contatos de emergência médica acessíveis;</li>
              <li>Saiba onde fica o posto de saúde mais próximo.</li>
            </ul>
          </div>
        </div>

        {/* Alimentos */}
        <div className="section">
          <h2>
            <Utensils className="icon-amarelo" />
            Alimentos
          </h2>
          <div className="section-content">
            <ul>
              <li>Armazene alimentos não perecíveis;</li>
              <li>Estoque água potável suficiente;</li>
              <li>Tenha um abridor de latas manual;</li>
              <li>Prepare alimentos enlatados e secos.</li>
            </ul>
          </div>
        </div>

        {/* Prevenção de Pragas */}
        <div className="section">
          <h2>
            <Bug className="icon-amarelo" />
            Prevenção de Pragas
          </h2>
          <div className="section-content">
            <ul>
              <li>Verifique se há rachaduras nas paredes;</li>
              <li>Evite áreas próximas a encostas de risco (deslizamentos);</li>
              <li>Mantenha equipamentos elétricos longe de áreas de risco.</li>
            </ul>
          </div>
        </div>

        {/* Gerenciamento de Lixo */}
        <div className="section">
          <h2>
            <Trash2 className="icon-amarelo" />
            Gerenciamento de Lixo
          </h2>
          <div className="section-content">
            <ul>
              <li>Prepare um plano familiar para saber onde se encontrar, caso seja necessário;</li>
              <li>Estabeleça um ponto de encontro fora da área de risco;</li>
              <li>Tenha uma lista de contatos de emergência de todos os membros da família.</li>
            </ul>
          </div>
        </div>

        {/* Preparação Geral */}
        <div className="section">
          <h2>
            <ShieldCheck className="icon-amarelo" />
            Preparação Geral
          </h2>
          <div className="section-content">
            <ul>
              <li>Tenha lanternas e pilhas extras;</li>
              <li>Prepare um kit de emergência com itens essenciais;</li>
              <li>Tenha um rádio a pilha para receber informações;</li>
              <li>Carregue seu celular completamente.</li>
            </ul>
          </div>
        </div>

        {/* Contatos de emergência */}
        <div className="section">
          <h2 className="contacts-header">Contatos de emergência</h2>
          <div className="contacts-grid">
            <div className="contact-item">
              <h3>Defesa Civil</h3>
              <a href="tell:199" className="contact-number">199</a>
            </div>
            <div className="contact-item">
              <h3>SAMU</h3>
              <a href="tell:192" className="contact-number">192</a>
            </div>
            <div className="contact-item">
              <h3>Bombeiros</h3>
              <a href="tell:193" className="contact-number">193</a>
            </div>
            <div className="contact-item">
              <h3>Polícia</h3>
              <a href="tell:190" className="contact-number">190</a>
            </div>
          </div>
        </div>
      </div>
      </div>




        {/* Durante a enchente */}      
        <div className="section-header-laranja" id="durante-enchente">
          <h2>Ações Imediatas</h2>
        </div>

        {/* Cuidados com a Água */}
      <div className="content-acoes">
        <div className="section">
          <h2>
            <GlassWater className="icon-laranja" />
            Cuidados com a Água
          </h2>
          <div className="section-content">
            <ul>
              <li>Evite contato com água da enchente</li>
              <li>Use botas e luvas se precisar entrar na água;</li>
              <li>Não deixe crianças brincarem na água;</li>
              <li>Beba apenas água potável.</li>
            </ul>
          </div>
        </div>

        {/* Segurança da Casa */}
        <div className="section">
          <h2>
            <House className="icon-laranja" />
            Segurança da Casa
          </h2>
          <div className="section-content">
            <ul>
              <li>Desligue a energia elétrica;</li>
              <li>Feche o registro de gás;</li>
              <li>Evite áreas de risco de deslizamento;</li>
              <li>Siga as orientações da Defesa Civil.</li>
            </ul>
          </div>
        </div>

        {/* Cuidados com os animais domésticos */}
        <div className="section">
          <h2>
            <Bone className="icon-laranja" />
            Cuidados com os animais domésticos
          </h2>
          <div className="section-content">
            <ul>
              <li>Não deixe seus animais domésticos em casa se precisar ir para um abrigo;</li>
              <li>Se o abrigo permitir animais, siga as orientações do coordenador quanto à acomodação;</li>
              <li>Caso o abrigo não permita animais, peça a amigos ou familiares para cuidarem deles;</li>
              <li>Prepare um kit de emergência para seus animais (comida, água, medicamentos, documentos).</li>
            </ul>
          </div>
        </div>
      </div>







      {/* Pós-Enchente */}      
      <div className="section-header-azul" id="depois-enchente">
          <h2>Recuperação e Cuidados Pós-Enchente</h2>
        </div>
        {/* Limpeza e Desinfecção */}
      <div className="content-recuperacao">
        <div className="section">
          <h2>
            <GlassWater className="icon-azul" />
            Limpeza e Desinfecção
          </h2>
          <div className="section-content">
            <ul>
              <li>Remova a lama e lave os objetos que tiveram contato com a água da enchente;</li>
              <li>Desinfete os objetos com solução de água sanitária (1 parte de água sanitária para 9 partes de água);</li>
              <li>Use equipamentos de proteção como luvas e botas durante a limpeza;</li>
              <li>Lave bem as mãos após a limpeza, mesmo tendo usado luvas.</li>
            </ul>
          </div>
        </div>

        {/* Descarte de lixo e Entulho */}
        <div className="section">
          <h2>
            <Trash2 className="icon-azul" />
            Descarte de lixo e Entulho
          </h2>
          <div className="section-content">
            <ul>
              <li>Não jogue lixo ou entulho em rios, córregos ou vias públicas;</li>
              <li>Separe o lixo em sacos plásticos resistentes;</li>
              <li>Aguarde a coleta regular de lixo ou instruções específicas da prefeitura;</li>
              <li>Para grandes quantidades de entulho, consulte a prefeitura sobre pontos de coleta especiais.</li>
            </ul>
          </div>
        </div>

        {/* Alimentos e Medicamentos */}
        <div className="section">
          <h2>
            <Utensils className="icon-azul" />
            Alimentos e Medicamentos
          </h2>
          <div className="section-content">
            <ul>
              <li>Não consuma alimentos que entraram em contato com as águas da inundação;</li>
              <li>Descarte medicamentos que tiveram contato com a água da enchente.</li>
            </ul>
          </div>
        </div>

        {/* Contatos Úteis */}
        <div className="section">
          <h2>
            <Phone className="icon-azul" />
            Contatos Úteis
          </h2>
          <div className="section-content">
            <ul>
              <li>Prefeitura: 0800 281 0040</li>
              <li>Serviço de Limpeza Urbana: 156</li>
              <li>Defesa Civil: 199</li>
              <li>Corpo de Bombeiros: 193</li>
            </ul>
          </div>
        </div>

        {/* Alertas Importantes */}
        <div className="section">
          <h2>
            <TriangleAlert className="icon-azul" />
            Alertas Importantes
          </h2>
          <div className="section-content">
            <ul>
              <li>Não entre em contato direto com a água da enchente ou lama sem proteção adequada;</li>
              <li>Fique atento a sintomas de doenças como leptospirose nos dias e semanas seguintes;</li>
              <li>Em caso de dúvidas sobre o descarte de materiais específicos, consulte as autoridades locais.</li>
            </ul>
          </div>
        </div>
      </div>
      </div>

      <CallToAction />

    </>
)
}

export default Orientacoes;