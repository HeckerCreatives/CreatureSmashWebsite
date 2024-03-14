import OwnCreatureCard from "components/Cards/Owncreature";
import PaginationPager from "components/Pagination/pagination";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Gorc from "assets/03-Gold/01-Orc.png"
import Gyeti from "assets/03-Gold/02-Yeti.png"
import Gminotaur from "assets/03-Gold/03-Minotaur.png"
import Gdragon from "assets/03-Gold/04-Dragon.png"
import Gleviathan from "assets/03-Gold/05-Leviathan.png"
const GoldInventory = () => {
    const [orc, setOrc] = useState([]),
    [yeti, setYeti] = useState([]),
    [minotaur, setMinotaur] = useState([]),
    [dragon, setDragon] = useState([]),
    [leviathan, setLeviathan] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/inventory/getinventory?rank=gold&page=${page - 1}&limit=10`,{
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
                const gorc = data.data.g_orc
                const gyeti = data.data.g_yeti
                const gminotaur = data.data.g_minotaur
                const gdragon = data.data.g_dragon
                const gleviathan = data.data.g_leviathan
                
                
                setOrc(gorc)
                setYeti(gyeti)
                setMinotaur(gminotaur)
                setDragon(gdragon)
                setLeviathan(gleviathan)
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
                    orc != undefined &&

                    <OwnCreatureCard
                    title="Orc"
                    image={Gorc}
                    dailyaccumulated={orc.dailyaccumulated}
                    totalaccumulated={orc.totalaccumulated}
                    qty={orc.qty}
                    />
                }

                { 
                    yeti != undefined &&

                    <OwnCreatureCard
                    title="Yeti"
                    image={Gyeti}
                    dailyaccumulated={yeti.dailyaccumulated}
                    totalaccumulated={yeti.totalaccumulated}
                    qty={yeti.qty}
                    />
                }

                { 
                    minotaur != undefined &&

                    <OwnCreatureCard
                    title="Minotaur"
                    image={Gminotaur}
                    dailyaccumulated={minotaur.dailyaccumulated}
                    totalaccumulated={minotaur.totalaccumulated}
                    qty={minotaur.qty}
                    />
                }

                { 
                    dragon != undefined &&

                    <OwnCreatureCard
                    title="Dragon"
                    image={Gdragon}
                    dailyaccumulated={dragon.dailyaccumulated}
                    totalaccumulated={dragon.totalaccumulated}
                    qty={dragon.qty}
                    />
                }

                { 
                    leviathan != undefined &&

                    <OwnCreatureCard
                    title="Leviathan"
                    image={Gleviathan}
                    dailyaccumulated={leviathan.dailyaccumulated}
                    totalaccumulated={leviathan.totalaccumulated}
                    qty={leviathan.qty}
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

export default GoldInventory;