import styles from "./TodayPlan.module.css";
import { useEffect, useState } from "react";
import TodoTimeTable from "./../components/TodoTimeTable";
import WeatherBox from "../components/WeatherBox";

const getColorByTitle = (title: string) => {
    switch (title) {
        case "Event":
            return "#6c757d";
        case "정리":
            return "pink";
        case "공부":
            return "orange";
        case "돈":
            return "skyblue";
        case "글":
            return "#3CB371";
        default:
            return "#6c757d";
    }
};

function Home() {
    const [highlighted, setHighlighted] = useState<boolean[][]>(
        Array.from({ length: 24 }, () => Array(6).fill(false))
    );
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleCellClick = (hour: number, cell: number) => {
        const updated = [...highlighted];
        updated[hour][cell] = !updated[hour][cell];
        setHighlighted(updated);
    };

    const [time, setTime] = useState("");

    const getCurrentTime = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${year}년 ${month}월 ${date}일 ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        setTime(getCurrentTime());
        const timer = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const categories = ["Event", "정리", "돈", "공부", "글", "*"];
    const categoryCounts: { [key: string]: number } = {
        Event: 1,
        정리: 1,
        공부: 5,
        돈: 4,
        글: 1,
        "*": 1,
    };
    const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
        {}
    );
    const [checkedMap, setCheckedMap] = useState<{ [key: string]: boolean }>(
        {}
    );

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeTitleContainer}>
                <div className={styles.todayInformation}>
                    {time}
                </div>
                <div className={styles.todayWeather}>
                    <WeatherBox />
                </div>
            </div>

            <div className={styles.homeTodoContainer}>
                <div className={styles.todoContainer}>
                    {categories.map((category) => (
                        <div
                            key={category}
                            className={styles.inputContainer}
                        >
                            <div
                                style={{
                                    backgroundColor: getColorByTitle(category),
                                }}
                            >
                                {category}
                            </div>
                            {Array.from({
                                length: categoryCounts[category] || 1,
                            }).map((_, i) => {
                                const key = `${category}-${i}`;
                                const value = inputValues[category]?.[i] ?? "";
                                const isChecked = checkedMap[key] ?? false;

                                return (
                                    <div key={key} className={styles.todoRow}>
                                        <div>{i + 1}.</div>
                                        {value ? (
                                            <div
                                                className={`${
                                                    styles.todoText
                                                } ${
                                                    isChecked
                                                        ? styles.checked
                                                        : ""
                                                }`}
                                                style={{
                                                    ["--bg-color" as any]: getColorByTitle(category), // 커스텀 속성 넘기기
                                                }}
                                            >
                                                {value}
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder={`${category} ${
                                                    i + 1
                                                }`}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        const val = (
                                                            e.target as HTMLInputElement
                                                        ).value;
                                                        if (!val.trim()) return;

                                                        const updated = [
                                                            ...(inputValues[
                                                                category
                                                            ] || []),
                                                        ];
                                                        updated[i] = val;

                                                        setInputValues({
                                                            ...inputValues,
                                                            [category]: updated,
                                                        });
                                                    }
                                                }}
                                            />
                                        )}
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) =>
                                                setCheckedMap({
                                                    ...checkedMap,
                                                    [key]: e.target.checked,
                                                })
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div className={styles.tableContainer}>
                    <TodoTimeTable />
                </div>
            </div>
        </div>
    );
}

export default Home;