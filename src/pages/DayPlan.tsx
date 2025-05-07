import React from 'react';
import styles from './DayPlan.module.css';
import WeekGoal from '../components/WeekGoal.tsx';
import Todo from '../components/Todo.tsx';
import { useState } from 'react';

function DayPlan () {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    
    const [selectedDate, setSelectedDate] = useState("");
    const [weekday, setWeekday] = useState("");

    // 날짜 요일 보이게 하는 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedDate(value);
    
        const date = new Date(value);
        const day = date.toLocaleDateString("ko-KR", { weekday: "long" });
        setSelectedDate(value);
        setWeekday(day);

        if (day !== "월요일") {
        alert("월요일을 선택해주세요.");
        setSelectedDate("");
        setWeekday(""); //일단 남겨둠
        } else {
        setSelectedDate(value);
        setWeekday(day); // 일단 남겨둠
        
        const updated = [...(selectedDate || []), value];
        
        setWeekday(day);
        }
    };

    return (
        <div className={styles.DayPlanContainer}>

                <div className={styles.weekGoalContainer}>

                    <div className='mb-1' style={{fontWeight:"bold", fontSize:"20px"}}>This Week's Goal</div>
                    <div className={`mb-1 ${styles.dateContainer}`}>
                        { selectedDate ? (
                            <>
                                <div>{selectedDate} ~ {
                                    new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 6)).toLocaleDateString("ko-KR")
                                    }</div>
                                <div className={styles.dateAgainContainer} onClick={() => setSelectedDate("")} style={{"cursor":"pointer"}}>날짜 다시 선택</div>
                            </>
                        ) : 
                        (<input type="date" value={selectedDate} onChange={handleChange} />
                        )}
                    </div>

                    <Todo />

                </div>

                <div className={styles.dayTodoContainer}>

                    { selectedDate ? (
                        days.map((day,i) => (

                            <div key={day} className={styles.todoContentContainer}>
                                {
                                new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + i)).toLocaleDateString("ko-KR", { month: "numeric", day: "numeric", weekday: "long"})
                                }
                                <WeekGoal />
                            </div>
                            
                        ))
                    ) : (
                        <div className={styles.todoCotentContainer} style={{textAlign:"center"}}>날짜를 선택해주세요.
                        </div>
                    )}

                </div>

            </div>
    );
}

export default DayPlan;