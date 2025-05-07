import React, { useState } from "react";
import styles from "./MonthPlan.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./CalendarOverride.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MonthPlan() {
    const [activeModal, setActiveModal] = useState<null | "modal1" | "modal2">(null);
    const [todoByDate, setTodoByDate] = useState<{
        [key: string]: (typeof formData)[];
    }>({});

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        title: "",
        content: "",
    });

    const handleSave = () => {
        const dateKey = formData.date;

        if (!dateKey) {
            alert("날짜를 선택해주세요.");
            return;
        } else if (!formData.title) {
            alert("제목을 입력해주세요.");
            return;
        }

        const prev = todoByDate[dateKey] || [];

        setTodoByDate({
            ...todoByDate,
            [dateKey]: [...prev, formData],
        });

        // 초기화
        setFormData({
            date: "",
            time: "",
            title: "",
            content: "",
        });

        setActiveModal(null); // 모달 닫기
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        const key = date.toISOString().split("T")[0];
        const items = todoByDate[key];

        if (view === "month" && items?.length) {
            return (
                <ul
                    style={{
                        fontSize: "0.6rem",
                        padding: 0,
                        margin: 0,
                        listStyle: "none",
                    }}
                >
                    {items.slice(0, 2).map((item, i) => (
                        <li key={i}>
                            🕓 {item.time} - {item.title.length > 10
                                ? item.title.slice(0, 10) + "..."
                                : item.title}
                        </li>
                    ))}
                </ul>
            );
        }

        return null;
    };

    return (
        <div className={styles.container}>
            <Button
                variant="primary"
                onClick={() => setActiveModal("modal1")}
                className={styles.addButton}
            >
                일정 추가
            </Button>

            {/* 일정 추가 모달 */}
            <Modal show={activeModal === "modal1"} onHide={() => setActiveModal(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>일정 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                    >
                        일정날짜* :
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    date: e.target.value,
                                })
                            }
                        />
                        <br />
                        <br />
                        일정시간* :
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    time: e.target.value,
                                })
                            }
                        />
                        <br />
                        <br />
                        일정제목 :
                        <input
                            type="text"
                            placeholder="일정 제목"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                        />
                        <br />
                        <br />
                        일정내용 :
                        <input
                            type="text"
                            placeholder="일정 내용"
                            value={formData.content}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    content: e.target.value,
                                })
                            }
                        />
                        <br />
                        <br />
                        <button type="submit">일정 추가</button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* 캘린더 */}
            <Calendar
                tileContent={tileContent}
                onClickDay={() => {
                    setActiveModal("modal2");
                }}
            />

            {/* 일정 보기 모달 */}
            <Modal
                show={activeModal === "modal2"}
                onHide={() => setActiveModal(null)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>일정 보기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>선택한 날짜의 일정이 여기에 표시됩니다.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setActiveModal(null)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MonthPlan;
