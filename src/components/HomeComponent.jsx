import React , { useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Container , Row } from "react-bootstrap";


function HomeComponent() {

    const user = useSelector ( state => state.user.user )

    const navigate = useNavigate ()

    const checkRoleReturnBoolean = (roleToCheck) => {
       return user.roles.filter ( el => el === roleToCheck ).length !== 0
    }

    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        }

        if (!checkRoleReturnBoolean("ROLE_ADMIN")) {
            navigate ( "/fatture")
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );



    return (
        <Container fluid
                   style={{
                       backgroundImage: "linear-gradient(to bottom, aliceblue, white)",
                       padding: "2em",
                   }}
                   className={ "text-center" }>
            <Row>
                <h1
                    style={ {
                        color : "royalblue"
                    } }>BENVENUTI IN EPIC ENERGY</h1>
                <h2 style={ {color : "royalblue"} }>
                    Naviga tra le sezioni per testare le seguenti funzionalità:
                </h2>
                <p>[modalità admin]</p>
                <h3 style={ {color : "royalblue" , marginTop : "100px"} }>
                    CLIENTI
                </h3>
                <h5 style={ {color : "slategray" , marginTop:"50" }}>(Solo gli admin possono vedere tutti i clienti. Nel caso di accesso da parte di un utente normale, esso potrà visualizzare solo i clienti a lui assegnatigli)</h5>
                <h4 style={ {color : "royalblue" , marginTop:"50" }}>
                    I clienti in epic energy sono molto importanti, essi sono le utenze che porteranno guadagni all'azienda. Essi dovranno essere assegnati ad un utente(che sarà un dipendente dell'azienda epic energy che dovrà occuparsi di gestire le fatture del cliente assegnatogli. Un utente potrà seguire più clienti in contemporanea, un cliente non potrà avere più di un utente di riferimento), di seguito la lista delle funzionalità della sezione cliente:
                </h4>
                <ol style={ {
                    textAlign : "start" ,
                    width : "50%" ,
                    margin : "50px auto" ,
                    fontWeight : "bold" ,
                    color : "royalblue"
                } }>
                    <li>La lista di tutti i clienti, composta da card che ne visualizzano le informazioni, ogni suddetta
                        avrà una sezione nascosta per le informazioni aggiuntive di valore meno rilevante. Inoltre sarà
                        possibile eliminare un cliente cliccando sull'icona del cestino rosso.
                    </li>
                    <li className="mt-2">Nella barra delle impostazioni a destra(apribile con la freccetta in alto a
                        destra) troviamo due nuove sezioni, aggiungi nuovo cliente e modifica cliente già esistente.
                    </li>
                    <li className="mt-2">Sopra ogni lista avremo la possibilità di fare delle ricerche, nel caso del
                        cliente potremmo ricercare per:
                        <ul>
                            <li>Data di inserimento(la data in cui il cliente è stato registrato nel sistema)</li>
                            <li>Fatturato</li>
                            <li>Per nome e cognome</li>
                        </ul>
                    </li>
                </ol>
                <h3 style={ {color : "royalblue" , marginTop : "100px"} }>
                    UTENTI(visualizzabile solo da un admin)
                </h3>
                <h4 style={ {color : "royalblue" , marginTop:"50" }}>
                    Gli utenti rappresentano il motore dell'azienda epic energy, essi si occuperanno della clientela e ne seguiranno ogni aspetto come il contatto telefonico o email. Inoltre dovranno poter contabilizzare le fatture e modificarle all'evenienza. Funzionalità:
                </h4>
                <ol style={ {
                    textAlign : "start" ,
                    width : "50%" ,
                    margin : "50px auto" ,
                    fontWeight : "bold" ,
                    color : "royalblue"
                } }>
                    <li className="mt-2">La lista di tutti gli utenti attualmente inseriti nell'organico di epic energy </li>
                    <li className="mt-2">Nella barra delle impostazioni a destra troviamo due sezioni, aggiungi nuovo utente e modifica utente già esistente</li>
                    <li className="mt-2">Possiamo eliminare gli utenti nello stesso modo dei clienti</li>
                </ol>
                <h3 style={ {color : "royalblue" , marginTop : "100px"} }>
                    FATTURE
                </h3>
                <h5 style={ {color : "royalblue" , marginTop:"50" }}>(Gli admin hanno accesso a tutte le fatture, mentre i clienti possono visualizzare solo le fatture che appartengono ai clienti assegnatigli)</h5>
                <h4 style={ {color : "royalblue" , marginTop:"50" }}>
                    Le fatture sono inserite nel sistema dagli utenti che ne possono visualizzare le informazioni e modificarle. Di seguito le funzionalità della sezione fattura:
                </h4>
                <ol style={ {
                    textAlign : "start" ,
                    width : "50%" ,
                    margin : "50px auto" ,
                    fontWeight : "bold" ,
                    color : "royalblue"
                } }>
                    <li className="mt-2">La lista delle fatture ricercabili per nome del cliente ed importo.</li>
                    <li className="mt-2">La sezione aggiungi fattura dove è possibile creare una fattura ed assegnarla ad un cliente.</li>
                    <li className="mt-2">La sezione per modificare le fatture già inserite, dove sarà possibile selezionare la fattura dalla lista</li>
                </ol>

            </Row>

        </Container>
    )
}

export default HomeComponent