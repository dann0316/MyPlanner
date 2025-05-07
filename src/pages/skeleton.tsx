import styles from "./Skeleton.module.css";
import { useEffect, useState } from "react";

export default function Skeleton() {
    const [animationClass, setAnimationClass] = useState(styles.initial);

    useEffect(() => {
        const enter = requestAnimationFrame(() => {
            setAnimationClass(styles.paintIn);
        });

        // 1️⃣ paintIn 끝나고 잠깐 정지 → paintOut 시작
        const timeout1 = setTimeout(() => {
            setAnimationClass(styles.paintOut);
        }, 600); // 🎯 paintIn이 끝나는 시간보다 살짝 더 여유 있게!

        // 2️⃣ 완전히 끝났을 때 정리
        const timeout2 = setTimeout(() => {
            // 여기에 페이지 전환 완료 후 처리 (예: 상태 변경)
        }, 600); // paintOut transition까지 고려

        return () => {
            cancelAnimationFrame(enter);
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    return <div className={`${styles.skeletonContainer} ${animationClass}`} />;
}
