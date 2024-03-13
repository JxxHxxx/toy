import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { MemberLeaveInfo } from "../component/MemberLeave"
import { DepartmentVacationTable } from "../component/Table"
import { SideMenuList } from "../component/SideMenuList"

export const VacationMainPage = () => {

    return (
        <Grid2 container spacing={2}>

            <Grid2 item xs={4} md={2}
                sx={{
                    border: '1px solid #000',
                    borderTop: 'none', 
                    borderBottom: 'none',
                    // height: '100vh'
                }}>
                <SideMenuList></SideMenuList>
            </Grid2>

            <Grid2 item xs={4} md={4}
                sx={{
                    bgcolor: '#fff',
                    // border: '1px solid #000',
                    borderTop: 'none',
                    height: '30vh'
                }}>
                <span>Contents</span>
            </Grid2>

            <Grid2 item xs={4} md={4}
                sx={{
                    // border: '1px solid #000',
                    borderTop: 'none',
                    height: '30vh'
                }}>
                <MemberLeaveInfo></MemberLeaveInfo>
            </Grid2>
            
            <Grid2 item xs={2} md={2}
                sx={{
                    border: '1px solid #000',
                    borderTop: 'none',
                    borderBottom: 'none',
                    // height: '100vh'
                }}>
                <span>Left bar</span>
            </Grid2>
            <Grid2 item xs={4} md={2}></Grid2>
            <Grid2 item xs={12} md={8} sx={{
                // border: '1px solid #000',
                height: '50vh'
            }}>
                <DepartmentVacationTable></DepartmentVacationTable>
            </Grid2>
            <Grid2 item xs={4} md={2}></Grid2>

        </Grid2>
    )
}