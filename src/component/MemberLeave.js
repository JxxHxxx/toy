import { Fragment, useEffect, useState } from "react";
import { getMemberLeave } from "../api/VacationApi";
import { MemberLeaveBar } from "../tmp/Chart";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
export const MemberLeaveInfo = () => {
    const [memberLeave, setMemberLeave] = useState({
        name: '',
        totalLeave: 0,
        remainingLeave: 0
    });

    const location = useLocation();
    const loginMemberId = location.state?.memberId;

    const fetchMemberLeave = async () => {
        try {
            const findVacations = await getMemberLeave(loginMemberId);
            setMemberLeave(findVacations);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (loginMemberId) {
            fetchMemberLeave();
        }
    }, []);

    return (
        <Fragment>
            <ul>
                <ui>{memberLeave.name}님 </ui>
                <ui>부서 명 :{memberLeave.departmentName} </ui>
            </ul>
            <MemberLeaveBar props={memberLeave}></MemberLeaveBar>
        </Fragment>
    )
}