import style from "./loadingSpinner.module.scss";

export function LoadingSpinner() {
    return (
        <div className={style.loadingSpinner}>
            <div className={style.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
