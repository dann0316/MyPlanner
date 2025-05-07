import { useState, useEffect } from "react";
import styles from "./Todo.module.css";

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

function Todo() {
    const categories = ["Event", "정리", "돈", "공부", "글", "*"];
    const categoryCounts: { [key: string]: number } = {
        Event: 6,
        정리: 4,
        공부: 7,
        돈: 7,
        글: 3,
        "*": 3,
    };

    const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>(
        {}
    );

    // 글씨 지우는 선 state -> 문제) 체크 박스 클릭 시 글씨 지우는 게 모든 요소에 적용됨
    // const [checked, setChecked] = useState<boolean>(false);
    // 해결) 체크박스 클릭 시 글씨 지우는 선 따로 생기게 하는 state
    const [checkedMap, setCheckedMap] = useState<{ [key: string]: boolean }>(
        {"":false} // 이거니까 그냥 {}로 초기화 해도 됨
    );

    // input 값 엔터 누를 시 값 저장 함수
    // const handleKeyDown = (
    //     e: React.KeyboardEvent<HTMLInputElement>,
    //     category: string
    // ) => {
    //     if (e.key === "Enter") {
    //         const value = inputValues[category];

    //         if (!value.trim()) return;

    //         // 저장
    //         setRowsByCategory({
    //             ...rowsByCategory,
    //             [category]: [...rowsByCategory[category], value],
    //         });

    //         // 인풋 초기화
    //         setInputValues({
    //             ...inputValues,
    //             [category]: "",
    //         });
    //     }
    // };

    return (
        <div>
            {categories.map((title) => (
                <div key={title}>
                    <div
                        className={styles.titleContainer}
                        style={{ backgroundColor: getColorByTitle(title) }}
                    >
                        {title}
                    </div>

                    <div className={styles.inputContainer}>
                        {Array.from({ length: categoryCounts[title] || 1 }).map(
                            (_, i) => {
                                const value = inputValues[title]?.[i];
                                const key = `${title}-${i}`;

                                return (
                                    <div
                                        className={styles.inputContentContainer}
                                        key={i}
                                    >
                                        <div>{i + 1}.</div>
                                        {value ? (
                                            // 이미 저장된 값이 있으면 텍스트만 보여줌
                                            <div
                                                className={`${
                                                    styles.todoText
                                                } ${
                                                    checkedMap[key] ? styles.checked : ""
                                                }`}

                                                style={{
                                                    ["--bg-color" as any]: getColorByTitle(title), // 커스텀 속성 넘기기
                                                }}
                                            >
                                                {value}
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder={`${title} ${
                                                    i + 1
                                                }`}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        const val = (
                                                            e.target as HTMLInputElement
                                                        ).value;
                                                        if (!val.trim()) {
                                                            alert(
                                                                "내용을 입력하세요!"
                                                            );
                                                            return;
                                                        }

                                                        const updated = [
                                                            ...(inputValues[title] || [])];
                                                        updated[i] = val;
                                                        setInputValues({
                                                            ...inputValues,
                                                            [title]: updated,
                                                        });
                                                    }
                                                }}
                                            />
                                        )}
                                        <input
                                            className={styles.checkBox}
                                            type="checkbox"
                                            checked={checkedMap[key] || false}
                                            onChange={(e) => {
                                                setCheckedMap({
                                                    ...checkedMap,
                                                    [key]: e.target.checked,
                                                });
                                            }}
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Todo;
