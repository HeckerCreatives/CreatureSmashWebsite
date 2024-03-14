import OwnCreatureCard from "components/Cards/Owncreature";
import PaginationPager from "components/Pagination/pagination";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sgoblin from "assets/02-Silver/01-Goblin.png"
import Stroll from "assets/02-Silver/02-Troll.png"
import Sogre from "assets/02-Silver/03-Ogre.png"
import Sorc from "assets/02-Silver/04-Orc.png"
import Syeti from "assets/02-Silver/05-Yeti.png"
import Sminotaur from "assets/02-Silver/06-Minotaur.png"
import Sdragon from "assets/02-Silver/07-Dragon.png"
const SilverInventory = () => {
    const [goblin, setGoblin] = useState([]),
    [troll, setTroll] = useState([]),
    [ogre, setOgre] = useState([]),
    [orc, setOrc] = useState([]),
    [yeti, setYeti] = useState([]),
    [minotaur, setMinotaur] = useState([]),
    [dragon, setDragon] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/inventory/getinventory?rank=silver&page=${page - 1}&limit=10`,{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
        }).then(result => result.json())
        .then(data => {
            if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
                Swal.fire({
                  icon: "error",
                  title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
                  text: data.message == "duallogin" ? "Hi Creature, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Creature please contact admin" : "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    window.location.href = "/login";
                  }
                })
            }

            if(data.message == "success"){
                const sgoblin = data.data.s_goblin
                const stroll = data.data.s_troll
                const sogre = data.data.s_ogre
                const sorc = data.data.s_orc
                const syeti = data.data.s_yeti
                const sminotaur = data.data.s_minotaur
                const sdragon = data.data.s_dragon

                setGoblin(sgoblin)
                setOrc(sorc)
                setTroll(stroll)
                setOgre(sogre)
                setYeti(syeti)
                setMinotaur(sminotaur)
                setDragon(sdragon)
                setIsLoading(false)
                setTotal(data.data.totalPages)
            } else if (data.message == "failed"){
                Swal.fire({
                  title: data.message,
                  icon: "info",
                  text: data.data
                })
              }
        })
    },[page])

    return(
        <MDBContainer fluid>
            <MDBRow>
                { 
                    goblin != undefined &&

                    <OwnCreatureCard
                    title="Goblin"
                    image={Sgoblin}
                    dailyaccumulated={goblin.dailyaccumulated}
                    totalaccumulated={goblin.totalaccumulated}
                    qty={goblin.qty}
                    />
                }

                { 
                    troll != undefined &&

                    <OwnCreatureCard
                    title="Troll"
                    image={Stroll}
                    dailyaccumulated={troll.dailyaccumulated}
                    totalaccumulated={troll.totalaccumulated}
                    qty={troll.qty}
                    />
                }

                { 
                    ogre != undefined &&

                    <OwnCreatureCard
                    title="Ogre"
                    image={Sogre}
                    dailyaccumulated={ogre.dailyaccumulated}
                    totalaccumulated={ogre.totalaccumulated}
                    qty={ogre.qty}
                    />
                }

                { 
                    orc != undefined &&

                    <OwnCreatureCard
                    title="Orc"
                    image={Sorc}
                    dailyaccumulated={orc.dailyaccumulated}
                    totalaccumulated={orc.totalaccumulated}
                    qty={orc.qty}
                    />
                }
                
                { 
                    yeti != undefined &&

                    <OwnCreatureCard
                    title="Yeti"
                    image={Syeti}
                    dailyaccumulated={yeti.dailyaccumulated}
                    totalaccumulated={yeti.totalaccumulated}
                    qty={yeti.qty}
                    />
                }

                { 
                    minotaur != undefined &&

                    <OwnCreatureCard
                    title="Minotaur"
                    image={Sminotaur}
                    dailyaccumulated={minotaur.dailyaccumulated}
                    totalaccumulated={minotaur.totalaccumulated}
                    qty={minotaur.qty}
                    />
                }

                { 
                    dragon != undefined &&

                    <OwnCreatureCard
                    title="Dragon"
                    image={Sdragon}
                    dailyaccumulated={dragon.dailyaccumulated}
                    totalaccumulated={dragon.totalaccumulated}
                    qty={dragon.qty}
                    />
                }
            </MDBRow>
            <PaginationPager
                total={total} 
                page={page} 
                setPage={setPage}
                isloading={isloading}
            />
        </MDBContainer>
    )
}

export default SilverInventory;