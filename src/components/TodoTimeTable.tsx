import { useState } from "react";
import styles from "./TodoTimeTable.module.css";

const getColorByTitle = (title: string) => {
    switch (title) {
        case "Event":
            return "#6c757d";
        case "정리":
            return "pink";
        case "Study":
            return "orange";
        case "Money":
            return "skyblue";
        case "Read&Write":
            return "#3CB371";
        case "Spent":
            return "grey";
        case "Wasted":
            return "red";
        default:
            return "transparent";
    }
};

const categories = ["Event", "Study", "Money", "Read&Write", "Spent", "Wasted"];

export default function TodoTimeTable() {
    const [selectedCategory, setSelectedCategory] = useState("Event");

    // 셀마다 선택된 카테고리 이름 저장
    const [highlighted, setHighlighted] = useState<string[][]>(
        Array.from({ length: 24 }, () => Array(6).fill(""))
    );

    const [isMouseDown, setIsMouseDown] = useState(false);

    const toggleCell = (hour: number, col: number) => {
        const updated = highlighted.map((row, h) =>
            h === hour
                ? row.map((cell, c) =>
                    c === col
                        ? cell === selectedCategory
                            ? ""
                            : selectedCategory
                        : cell
                )
                : row
        );
        setHighlighted(updated);
    };

    return (
        <>
            <div className={styles.markerContainer}>
                형광펜 고르기
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((title) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))}
                </select>
            </div>

            <table
                className={styles.table}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
            >
                <thead>
                    <tr>
                        <th>시간</th>
                        {Array.from({ length: 6 }, (_, i) => (
                            <th key={i}>{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {highlighted.map((row, hour) => (
                        <tr key={hour}>
                            <td>{hour.toString().padStart(2, "0")}시</td>
                            {row.map((cat, col) => (
                                <td
                                    key={col}
                                    style={{
                                        backgroundColor: cat
                                            ? getColorByTitle(cat)
                                            : "transparent",
                                        cursor: "pointer",
                                    }}
                                    onMouseDown={() => toggleCell(hour, col)}
                                    onMouseEnter={() => {
                                        if (isMouseDown) toggleCell(hour, col);
                                    }}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
