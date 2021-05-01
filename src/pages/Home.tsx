import { useState } from "react";
import { BookService } from "../services/BookService";
import { GrSearch } from "react-icons/gr";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Book } from "../domain/Book";
import { Item } from "../domain/Item";
import { groupBy } from "../helpers/helpers";

const Home = () => {
    const [books, setBooks] = useState([] as Book[]);
    const [searchString, setSearchString] = useState("");
    const [library, setLibrary] = useState("");
    const [language, setLanguage] = useState("");
    const [isxn, setIsxn] = useState("");
    const [year, setYear] = useState("");
    const [keywords, setKeywords] = useState("");
    const [showAdditionalSearch, setShowAdditionalSearch] = useState(false);

    const getLocationsString = (items: Item[]): string => {
        const itemGroup = groupBy(items, (i) => i.location.code);

        let locations = [] as String[];
        for (let k in itemGroup) {
            const location = `${k} [${itemGroup[k].length}]`;
            locations.push(location);
        }
        return locations.join(", ");
    };

    const searchQueryBuilder = (): string => {
        let result = "?";
        let arr = [];
        if (searchString?.length > 0) arr.push("q=" + searchString);
        if (library?.length > 0) arr.push("lib=" + library);
        if (language?.length > 0) arr.push("lang=" + language);
        if (isxn?.length > 0) arr.push("isxn=" + isxn);
        if (year?.length > 0) arr.push("y=" + year);
        if (keywords?.length > 0) arr.push("kw=" + keywords);

        if (!(arr.length > 0)) return "";

        return result + arr.join("&");
    };

    const onSearch = async () => {
        const searchQuery = searchQueryBuilder();
        console.log(searchQuery);
        const result = await BookService.getBooksElastic(searchString);
        if (result != null) {
            setBooks(result);
        }
        console.log(result);
    };

    return (
        <div className="home-container">
            <div className="container">
                <div className="content-container">
                    <div className="search-bar">
                        <div className="search-input-col">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Otsi raamatuid pealkirja või autori järgi..."
                                value={searchString}
                                onChange={(e) =>
                                    setSearchString(e.target.value)
                                }
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") onSearch();
                                }}
                            />
                        </div>
                        <div className="search-btn-col">
                            <button
                                className="search-btn"
                                onClick={() => onSearch()}
                            >
                                <GrSearch className="search-icon" />
                                <span>OTSI</span>
                            </button>
                        </div>
                    </div>

                    <div className="additional-search-settings">
                        {showAdditionalSearch && (
                            <div className="additional-search-container">
                                <div
                                    className="three-row grid-gap-1"
                                    style={{ marginBottom: "0.3em" }}
                                >
                                    <div className="form-group">
                                        <label>Raamatukogu</label>
                                        <select
                                            onChange={(e) =>
                                                setLibrary(
                                                    e.target.value.length > 0
                                                        ? e.target.value
                                                        : ""
                                                )
                                            }
                                        >
                                            <option value={""}>-</option>
                                            <option value="rarkh">
                                                Eesti Rahvusraamatukogu
                                            </option>
                                            <option>r1hdl</option>
                                            <option>asail</option>
                                            <option>oaest</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Keel</label>
                                        <select
                                            onChange={(e) =>
                                                setLanguage(
                                                    e.target.value.length > 0
                                                        ? e.target.value
                                                        : ""
                                                )
                                            }
                                        >
                                            <option value={""}>-</option>
                                            <option value="est">eesti</option>
                                            <option value="eng">inglise</option>
                                            <option value="rus">vene</option>
                                            <option>rootsi</option>
                                            <option>itaalia</option>
                                            <option>prantsuse</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Teavikulaad</label>
                                        <select>
                                            <option>-</option>
                                            <option>raamat</option>
                                            <option>ajakiri</option>
                                            <option>pisitrükis</option>
                                            <option>videosalvestis</option>
                                            <option>helisalvestis</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="three-row grid-gap-1">
                                    <div className="form-group">
                                        <label>ISXN</label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setIsxn(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Ilmumisaasta</label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Märksõnad</label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                setKeywords(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="additional-search-row">
                            <span
                                onClick={() =>
                                    setShowAdditionalSearch(
                                        !showAdditionalSearch
                                    )
                                }
                            >
                                {showAdditionalSearch ? (
                                    <BsChevronUp className="chevron" />
                                ) : (
                                    <BsChevronDown className="chevron" />
                                )}
                                TÄPSEM OTSING
                            </span>
                        </div>
                    </div>

                    <div className="book-container">
                        {books?.map((book, i) => {
                            return (
                                <div key={i} className="book-row">
                                    <div>
                                        <div className="title-field">
                                            {book.title ?? ""}
                                        </div>
                                        <div className="author-field">
                                            {book.author ?? ""}
                                        </div>
                                        <div className="additional-info-field">
                                            {book.publishYear ?? ""}
                                        </div>
                                        <div className="libraries-field">
                                            {getLocationsString(book.items)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
