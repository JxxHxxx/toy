import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { MemberLeaveInfo } from "../component/MemberLeave"
import DenseTable from "../tmp/Table"
import { SideMenuList } from "../component/SideMenuList"

export const VacationMainPage = () => {

    return (
        <Grid2 container spacing={2}>

            <Grid2 item xs={2}
                sx={{
                    border: '1px solid #000',
                    height: '100vh'
                }}>
                <SideMenuList></SideMenuList>
            </Grid2>

            <Grid2 container xs={4}>
                
                <Grid2 item xs={12}
                    sx={{
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        height: '25vh'
                    }}>
                    <span>Contents</span>
                </Grid2>
            </Grid2>

            <Grid2 container xs={4}>

                <Grid2 item xs={12}
                    sx={{
                        border: '1px solid #000',
                        height: '50vh'
                    }}>
                    <MemberLeaveInfo></MemberLeaveInfo>
                </Grid2>

                <Grid2 item xs={2}></Grid2>
                <Grid2 item xs={12} sx={{
                    border: '1px solid #000',
                    height: '50vh'
                }}>
                    <DenseTable></DenseTable>
                </Grid2>
            </Grid2>
            <Grid2 item xs={2}
                sx={{
                    border: '1px solid #000',
                    height: '100vh'
                }}>
                <span>Left bar</span>
            </Grid2>
        </Grid2>
    )
}