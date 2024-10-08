import React from 'react'
import JourneyBook from './JourneyBook'
import JourneyBookPage from './JourneyBookPage'
import JourneyBookPageContent from './JourneyBookPageContent'

export default function Books() {
    return (
        <div className="cover">
            <div className="book">
                <label htmlFor="page-1" className="book__page book__page--1">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg" alt="Post Photo" />
                </label>
                {/* Page 3 */}
                <label htmlFor="page-2" className="book__page book__page--4">
                    <div className="page__content">
                        <h1 className="page__content-title">I</h1>
                        <div className="page__content-blockquote">
                            <p className="page__content-blockquote-text">HARI SELDON — . . . born in the 11,988th year of the Galactic Era; died 12,069. The dates are more commonly given in terms of the current Foundational Era as -79 to the year 1 F.E. Born to middle-className parents on Helicon, Arcturus sector (where his father, in a legend of doubtful authenticity, was a tobacco grower in the hydroponic plants of the planet), he early showed amazing ability in mathematics. Anecdotes concerning his ability are innumerable, and some are contradictory. At the age of two, he is said to have. . . </p>
                            <p className="page__content-blockquote-text">. . . Undoubtedly his greatest contributions were in the field of psychohistory. Seldon found the field little more than a set of vague axioms; he left it a profound statistical science. . . . </p>
                            <p className="page__content-blockquote-text">. . . The best existing authority we have htmlFor the details of his life is the biography written by Gaal Dornick who, as a young man, met Seldon two years before the great mathematician's death. The story of the meeting . . .</p>
                            <span className="page__content-blockquote-reference">Encyclopedia Galactica*</span>
                        </div>
                        <div className="page__content-text">
                            <p>His name was Gaal Dornick and he was just a country boy who had never seen Trantor before. That is, not in real life. He had seen it many times on the hyper-video, and occasionally in tremendous three-dimensional newscasts covering an Imperial Coronation or the opening of a Galactic Council. Even though he had lived all his life on the world of Synnax, which circled a star at the edges of the Blue Drift, he was not cut off from civilization, you see. At that time, no place in the Galaxy was. </p>

                            <p>There were nearly twenty-five million inhabited planets in the Galaxy then, and not one but owed allegiance to the Empire whose seat was on Trantor. It was the last half-century in which that could be said. </p>
                            <p>To Gaal, this trip was the undoubted climax of his young, scholarly life. He had been in space before so that the trip, as a voyage and nothing more, meant little to him. To be sure, he had traveled previously only as far as Synnax's only satellite in order to get the data on the mechanics of meteor driftage which he needed htmlFor his dissertation, but space-travel was all one whether one travelled half a million miles, or as many light years. </p>
                        </div>
                        <div className="page__number">3</div>
                    </div>
                </label>

                <input type="radio" name="page" id="page-1" />

                {/* Page 2 */}
                <input type="radio" name="page" id="page-2" />
                <label className="book__page book__page--2">
                    <div className='book__page-front'>
                        <div className="page__content">
                            <h1 className="page__content-book-title">Name's Journey</h1>
                            <p className="page__content-author">Click on the marked date to see the details</p>
                        </div>
                        <div className="page__number">2</div>
                    </div>
                    <div className="book__page-back">
                        <div className="page__content">
                            <h1 className="page__content-title">Contents</h1>
                            <table className="page__content-table">
                                <tbody>
                                    <tr>
                                        <td align="left">Part I</td><td align="left">The Psycohistorians</td><td align="right">3</td>
                                    </tr>
                                    <tr>
                                        <td align="left">Part II</td><td align="left">The Encyclopedists</td><td align="right">43</td>
                                    </tr>
                                    <tr>
                                        <td align="left">Part III</td><td align="left">The Mayors</td><td align="right">87</td>
                                    </tr>
                                    <tr>
                                        <td align="left">Part IV</td><td align="left">The Traders</td><td align="right">147</td>
                                    </tr>
                                    <tr>
                                        <td align="left">Part V</td><td align="left">The Merchant Princes</td><td align="right">173</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="page__number">2</div>
                        </div>
                    </div>
                </label>



            </div>
        </div>

    )
}
