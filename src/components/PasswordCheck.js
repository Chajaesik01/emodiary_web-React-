import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import "../css/PasswordCheck.css"; // 별도의 CSS 파일을 import
import img from "./test.jpg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaDownload, FaShareAlt } from "react-icons/fa";

const PasswordForm = ({
                          password,
                          setPassword,
                          isCorrect,
                          setIsCorrect,
                          submitted,
                          setSubmitted,
                      }) => {
    // 서버로부터 비밀번호를 받아올 상태를 추가합니다.
    //const [serverPassword, setServerPassword] = useState(null);
    //임시 비밀번호
    const [serverPassword, setServerPassword] = useState("8IL9Ys");
    // 페이지가 로드될 때 비밀번호를 서버에서 받아옵니다.
    useEffect(() => {
        const fetchPassword = async () => {
            try {
                const response = await fetch('http://localhost:8080/getPassword');
                const password = await response.text();
                setServerPassword(password);
            } catch (error) {
                console.error("Failed to fetch password: ", error);
            }
        };

        fetchPassword();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        // 사용자가 입력한 비밀번호와 서버에서 가져온 비밀번호를 비교합니다.
        if (password === serverPassword) {
            setIsCorrect(true);
            setSubmitted(true);
        } else {
            setIsCorrect(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: '<p class="my-text">비밀번호가 일치하지 않습니다.</p>',
                customClass: {
                    icon: "my-icon",
                    title: "my-title",
                    container: "my-swal",
                    text: "my-text",
                },
            });
        }
    };
    return (
        <form
            onSubmit={onSubmit}
            className={`password-form ${isCorrect ? "hide-password-form" : ""}`}
        >
            <label className="password-label">
                <input
                    type="password"
                    className="input-text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span></span>
            </label>
            <button type="submit" className="submit-button">
                입력
            </button>
        </form>
    );
};

const Header = () => (
    <div
        style={{ backgroundColor: "blueviolet", color: "#fff", padding: "10px" }}
    >
        <h1>Emodiary</h1>
    </div>
);

// 푸터 컴포넌트
const Footer = () => (
    <div
        style={{
            backgroundColor: "lightgray",
            padding: "10px",
            position: "fixed",
            bottom: "0",
            width: "100%",
            display: "none",
        }}
    >
        <h3></h3>
    </div>
);

const SiteContainer = ({ siteLink, isCorrect, submitted }) => {
    const currentUrl = window.location.href;
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const siteImg1 = img;
    const FlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

    const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  `;

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const openModal = (imageSrc) => {
        const modalBox = document.querySelector(".modalBox");
        modalBox.innerHTML = "";

        const imgWrapper = document.createElement("div");
        modalBox.appendChild(imgWrapper);

        ReactDOM.render(
            <TransformWrapper>
                <TransformComponent>
                    <div className="centered-image">
                        <img src={imageSrc} alt="Image" />
                    </div>
                </TransformComponent>
            </TransformWrapper>,
            imgWrapper
        );

        document.querySelector(".modal").style.display = "block";
    };

    const closeModal = () => {
        document.querySelector(".modal").style.display = "none";
    };

    const onClickImgLink = useCallback((srcUrl: string, name: string) => {
        fetch(srcUrl, { method: "GET" })
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                setTimeout((_) => {
                    window.URL.revokeObjectURL(url);
                }, 1000);
                a.remove();
            })
            .catch((err) => {
                console.error("err", err);
            });
    }, []);

    const [isRotated, setIsRotated] = useState(false);
    const toggleRotation = () => {
        setIsRotated(!isRotated);
    };

    let sizeClass = "";

    if (windowSize >= 0 && windowSize < 576) {
        sizeClass = "vs-screen";
    } else if (windowSize >= 576 && windowSize < 768) {
        sizeClass = "mobile-screen";
    } else if (windowSize >= 768 && windowSize < 992) {
        sizeClass = "tablet-screen";
    } else if (windowSize >= 992 && windowSize < 1200) {
        sizeClass = "desktop-screen";
    } else if (windowSize >= 1200 && windowSize < 1480) {
        sizeClass = "big_desktop-screen";
    } else if (windowSize >= 1480 && windowSize < 2000) {
        sizeClass = "m_big_desktop-screen";
    }

    return (
        <div className={`site-container ${sizeClass}`}>
            <div className="message">
                <span className="highlight">일기 제목</span>
            </div>

            {isCorrect && submitted && (
                <>
                    <div
                        className="picture-container"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div className={`picture-main ${isRotated ? 'rotate' : ''}`}>
                            <div className="picture-front">
                                <img
                                    src={img}
                                    className="pickImg"
                                    onClick={() => openModal(siteImg1)}
                                />
                            </div>
                            <div className="picture-back">
                                <p>일기 내용</p>
                            </div>
                        </div>
                    </div>


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "57vh",
                            width: " 70vh",
                        }}
                    >
                        <button className="changeBtn" onClick={toggleRotation}>
                            {isRotated ? '그림 보기' : '글 보기'}
                        </button>

                        <button
                            className="downBtn"
                            onClick={() => {
                                let today = new Date();
                                let date =
                                    today.getFullYear() +
                                    "-" +
                                    (today.getMonth() + 1) +
                                    "-" +
                                    today.getDate();
                                let fileName = date + "의 일기" + ".jpg";
                                onClickImgLink(siteImg1, fileName);
                            }}
                        >
                            그림을 저장할래요&nbsp;
                            <FaDownload />
                        </button>
                    </div>

                    <div className="modal" onClick={closeModal}>
                        <div className={`modalBox ${sizeClass}`}></div>
                    </div>
                </>
            )}
        </div>
    );
};

const PasswordCheck: React.FC = () => {
    const [password, setPassword] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const siteLink = img; // 원하는 이미지 링크

    useEffect(() => {
        if (isCorrect && submitted) {
            // 이곳에서 필요한 코드를 작성합니다. 예를 들어, 상태를 변경하는 등의 작업을 수행할 수 있습니다.
        }
    }, [isCorrect, submitted]); // 종속성 배열에 isCorrect와 submitted를 포함시켰습니다.

    if (submitted && isCorrect) {
        return (
            <>
                <Header />
                <SiteContainer
                    siteLink={siteLink}
                    isCorrect={isCorrect}
                    submitted={submitted}
                />
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <Header />
                <div
                    className={
                        !submitted ? "password-container" : "password-container hidden"
                    }
                >
                    <div className="form-container">
                        <div className="text-style">Emodiary</div>
                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "0.2vh",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            비밀번호를 입력해 <br />
                            일기를 확인해보세요!
                        </div>
                        <PasswordForm
                            password={password}
                            setPassword={setPassword}
                            isCorrect={isCorrect}
                            setIsCorrect={setIsCorrect}
                            submitted={submitted}
                            setSubmitted={setSubmitted}
                        />
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
};

export default PasswordCheck;