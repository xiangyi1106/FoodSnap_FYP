import React, { useEffect } from 'react';
import './Book.css';
// import './JourneyBook.css';
const Book = () => {
    useEffect(() => {
        const pages = document.getElementsByClassName('page');
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (i % 2 === 0) {
                page.style.zIndex = pages.length - i;
            }
        }

        for (let i = 0; i < pages.length; i++) {
            pages[i].pageNum = i + 1;
            pages[i].onclick = function () {
                if (this.pageNum % 2 === 0) {
                    this.classList.remove('flipped');
                    this.previousElementSibling.classList.remove('flipped');
                } else {
                    this.classList.add('flipped');
                    this.nextElementSibling.classList.add('flipped');
                }
            };
        }
    }, []);

    return (
        <div className="book">
            <div id="pages" className="pages">
                {Array.from({ length: 32 }, (_, i) => (
                    <div className="page" key={i}>
                        {i === 0 ? <div>
                            <h1 class="page__content-book-title">Foundation</h1>
                            <h2 class="page__content-author">Isaac Asimov</h2>

                            <p class="page__content-credits">
                                Introduction by
                                <span>Paul Krugman</span>
                            </p></div> : i === 2 ? <p>Hello there!</p> : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Book;
