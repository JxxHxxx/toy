import { useEffect, useState } from "react";
import { getMemberLeave } from "../api/VacationApi";
import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DenseTable from "../tmp/Table";
import { MemberLeaveBar } from "../tmp/Chart";
import { useLocation } from "react-router-dom";

const MemberLeave = () => {
    const [memberId, setMemberId] = useState('');
    const [memberLeave, setMemberLeave] = useState({
        totalLeave: 0,
        remainingLeave: 0
    });

    const location = useLocation();
    const loginMemberId = location.state?.memberId;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const findVacations = await getMemberLeave(memberId);
            setMemberLeave(findVacations);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchMemberLeave = async () => {
        try {
            const findVacations = await getMemberLeave(loginMemberId);
            setMemberLeave(findVacations);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log('loginMemberId', loginMemberId);

        if (loginMemberId) {
            fetchMemberLeave();
        }
    }, [loginMemberId]);

    return (
        <Grid2 container spacing={2}>

            <Grid2 item xs={2}
                sx={{
                    border: '1px solid #000',
                    height: '100vh'
                }}>
            </Grid2>

            <Grid2 container xs={4}>

                <Grid2 item xs={6}
                    sx={{
                        bgcolor: '#fff',
                        border: '1px solid #000',
                        height: '25vh'
                    }}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField
                                    id="outlined-user"
                                    label="사용자ID"
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    value={memberId} onChange={(e) => setMemberId(e.target.value)} />
                            </div>
                            <Button type="submit">사용자검색</Button>
                        </form>
                    </div>
                </Grid2>

            </Grid2>

            <Grid2 container xs={4}>

                <Grid2 item xs={11}
                    sx={{
                        border: '1px solid #000',
                        height: '50vh'
                    }}>
                    <div>
                        <ul>
                            <ui>{memberLeave.name}님 </ui>
                            <ui>부서 명 :{memberLeave.departmentName} </ui>
                        </ul>
                        <MemberLeaveBar props={memberLeave}></MemberLeaveBar>
                    </div>
                </Grid2>

                <Grid2 item xs={2}></Grid2>
                <Grid2 item xs={11} sx={{
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
            </Grid2>
        </Grid2>
    )
}

export { MemberLeave };