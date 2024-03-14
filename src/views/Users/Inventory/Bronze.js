import OwnCreatureCard from "components/Cards/Owncreature";
import PaginationPager from "components/Pagination/pagination";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Bgoblin from "assets/01-Bronze/01-Goblin.png"
import Btroll from "assets/01-Bronze/02-Troll.png"
import Bogre from "assets/01-Bronze/03-Ogre.png"
import Borc from "assets/01-Bronze/04-Orc.png"
const BronzeInventory = () => {
    const [goblin, setGoblin] = useState([]),
    [troll, setTroll] = useState([]),
    [ogre, setOgre] = useState([]),
    [orc, setOrc] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/inventory/getinventory?rank=bronze&page=${page - 1}&limit=10`,{
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
                const bgoblin = data.data.b_goblin
                const btroll = data.data.b_troll
                const bogre = data.data.b_ogre
                const borc = data.data.b_orc
                
                setGoblin(bgoblin)
                setOrc(borc)
                setTroll(btroll)
                setOgre(bogre)
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
                    image={Bgoblin}
                    dailyaccumulated={goblin.dailyaccumulated}
                    totalaccumulated={goblin.totalaccumulated}
                    qty={goblin.qty}
                    />
                }

                { 
                    troll != undefined &&

                    <OwnCreatureCard
                    title="Troll"
                    image={Btroll}
                    dailyaccumulated={troll.dailyaccumulated}
                    totalaccumulated={troll.totalaccumulated}
                    qty={troll.qty}
                    />
                }

                { 
                    ogre != undefined &&

                    <OwnCreatureCard
                    title="Ogre"
                    image={Bogre}
                    dailyaccumulated={ogre.dailyaccumulated}
                    totalaccumulated={ogre.totalaccumulated}
                    qty={ogre.qty}
                    />
                }

                { 
                    orc != undefined &&

                    <OwnCreatureCard
                    title="Orc"
                    image={Borc}
                    dailyaccumulated={orc.dailyaccumulated}
                    totalaccumulated={orc.totalaccumulated}
                    qty={orc.qty}
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

export default BronzeInventory;