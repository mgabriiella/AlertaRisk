import React from 'react';
import './Termos.css'; // Importe o arquivo CSS específico para a página de termos

const Termos = () => {
    return (
        <div>
            <div className="termos-header">
                <p>TERMOS DE USO</p>
                <h2>Termos e condições</h2>
            </div>

            <div className="content-wrapper">
                <section className="termos">
                    <div className="termo-item">
                        <h3>1. Coleta de Dados:</h3>
                        <p>
                            Para fornecer alertas personalizados, coletamos informações como seu número de celular e endereço. Esses dados são utilizados exclusivamente para enviar alertas de enchentes e alagamentos.
                        </p>
                    </div>

                    <div className="termo-item">
                        <h3>2. Privacidade:</h3>
                        <p>
                            Respeitamos sua privacidade. Seus dados não serão compartilhados com terceiros sem sua autorização, exceto quando exigido por lei.
                        </p>
                    </div>

                    <div className="termo-item">
                        <h3>3. Responsabilidade:</h3>
                        <p>
                            O AlertaRisk fornece alertas com base em dados disponíveis, mas não podemos garantir a precisão absoluta das informações. Recomendamos que você tome decisões com base em múltiplas fontes de informação.
                        </p>
                    </div>

                    <div className="termo-item">
                        <h3>4. Cancelamento:</h3>
                        <p>
                            Você pode cancelar o recebimento de alertas a qualquer momento, excluindo sua conta na plataforma.
                        </p>
                    </div>

                    <div className="termo-item">
                        <h3>5. Alterações nos Termos:</h3>
                        <p>
                            Reservamos o direito de atualizar os termos e condições. Recomendamos que você os revise periodicamente.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Termos;