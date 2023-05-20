import './Example.css'
import { getColors, getHSL } from './Palette.js';


function passToCSS(varName, colorValues) {
    let example = document.getElementById('ex-body');
    return example.style.setProperty(varName, getHSL(colorValues));
};

function setBaseColors(palette) {
    let [base, light, midLight, midDark, dark] = palette;
    passToCSS('--main', base);
    passToCSS('--light', light);
    passToCSS('--dark', dark);
    passToCSS('--mid-light', midLight);
    passToCSS('--mid-dark', midDark);
};

function setSecondaryColors(palette) {
    let [base, light, midLight, midDark, dark] = palette;
    passToCSS('--second-main', base);
    passToCSS('--second-light', light);
    passToCSS('--second-dark', dark);
    passToCSS('--second-mid-light', midLight);
    passToCSS('--second-mid-dark', midDark);
};

function setAlternativeColors(palette) {
    let [base, light, midLight, midDark, dark] = palette;
    passToCSS('--alt-main', base);
    passToCSS('--alt-light', light);
    passToCSS('--alt-dark', dark);
    passToCSS('--alt-mid-light', midLight);
    passToCSS('--alt-mid-dark', midDark);
};

export function ExampleWebApp( {color, contrast, palType} ) {
    function buildPaletteNo(num) {
        let hueModifier = palType.hue[num];
        let newPalette = getColors(hueModifier, color, contrast);
        return newPalette;
    };
    if (document.getElementById("ex-body")) {
        if (palType.name === "monohromatic") {
            setBaseColors(buildPaletteNo(0));
            setSecondaryColors(buildPaletteNo(0));
            setAlternativeColors(buildPaletteNo(0));
        } else if (palType.name === "complementary") {
            setBaseColors(buildPaletteNo(0));
            setSecondaryColors(buildPaletteNo(1));
            setAlternativeColors(buildPaletteNo(1));
        } else {
            setBaseColors(buildPaletteNo(0));
            setSecondaryColors(buildPaletteNo(1));
            setAlternativeColors(buildPaletteNo(2));
        } 
    } 
    return (
        <div className="ex-body" id='ex-body'>
            <Nav></Nav>
            <Article></Article>
            <Header></Header>
            <Subscribe></Subscribe>
            <Info></Info>
            <Columns></Columns>
            <Footer></Footer>
        </div>
    )
};

function Header() {
    return (
        <div className="ex-header">
        <h1>SEA ET INVIDUNT</h1>
        </div>
    )
};

function Nav() {
    return (
        <div className="ex-nav" id='ex-nav'>
            <ul>
                <li>Amet</li>
                <li>Tempor</li>
                <li>Dolore</li>
                <li>Aliquyam</li>
                <li>Ipsum</li>
            </ul>
        </div>
    )
};

function Article() {
    return (
        <div className='ex-article'>
            <h2>Lorem</h2>
            <p>No magna aliquyam ipsum nonumy nonumy. Eirmod labore voluptua amet duo justo accusam amet invidunt. At ea lorem at sadipscing justo stet. Tempor et consetetur gubergren ipsum erat justo eos, eirmod et invidunt sanctus eirmod ea eos, et erat elitr sed no consetetur accusam.</p>
        </div>
    )
};

function Columns() {
    return (
        <div className="ex-columns">
            <ColumnA></ColumnA>
            <ColumnB></ColumnB>
            <ColumnC></ColumnC>
        </div>
    )
};

function ColumnA() {
    return (
        <div className="ex-column column-a">
            <div className="title-container">
                <h2>Aliquyam aliquyam</h2>
            </div>
            <div className="text-container">
                <p>Amet sed accusam sed diam ipsum erat sanctus tempor, accusam magna justo sadipscing erat et dolores. Sanctus labore dolor ut.</p>
            </div>
        </div>
    )
};

function ColumnB() {
    return (
        <div className="ex-column column-b">
            <div className="title-container">
                <h2>Rebum</h2>
            </div>
            <div className="text-container">
                <p>Takimata sed kasd sanctus dolor nonumy justo dolor ut erat magna. Kasd accusam dolore sit et, dolor ea et et rebum et, et amet.</p>
            </div>
        </div>
    )
};

function ColumnC() {
    return (
        <div className="ex-column column-c">
            <div className="title-container">
                <h2>Aliquyam</h2>
            </div>
            <div className="text-container">
                <p>Ipsum rebum labore ipsum amet sed sanctus stet elitr accusam. Sed diam vero eirmod lorem accusam.</p>
            </div>
        </div>
    )
};

function SubButton() {
    return (
        <div className='ex-button'>Accusam!</div>
    )
};

function Subscribe() {
    return (
        <div className='ex-subscribe'>
            <p><span>Takimata</span> erat at accusam sit diam sit, erat duo dolores dolor erat gubergren labore invidunt magna justo, sed kasd elitr dolore et diam eos ipsum at clita. Ut et gubergren sanctus clita eirmod magna consetetur, et.<SubButton></SubButton></p>
        </div>
    )
};

function Info() {
    return (
        <div className='ex-info'>
            <p><span>Dolor</span> sanctus justo dolores labore erat. Et vero justo lorem tempor ipsum ea accusam vero.</p> 
            <p><span>Eos</span> est et sit tempor et et lorem eos. Sit eos ut aliquyam et accusam labore diam sed at, sit et.</p>
            <p><span>Kasd</span> no elitr magna sed et et, justo eos gubergren eirmod sit duo gubergren accusam labore..</p>
        </div>
    )
};

function Footer() {
    return (
        <div className="ex-footer" id='ex-footer'>
            <ul id='ex-footer-ul'>
                <li>Vero eirmod</li>
                <li>Kasd accusam</li>
                <li>Magna justo</li>
                <li>Rebum</li>
            </ul>
        </div>
    )
};