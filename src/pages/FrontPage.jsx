import React, { Fragment, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MockPhoto from "../media/mock-photo.jpg";
import { initializeDB } from "../spoonacular.mjs";
import { searchByName } from "../firebase.mjs";
import "../stylesheets/frontpage.css";
import timer5 from "../media/timer5.png";
import timer10 from "../media/timer10.png";
import timer15 from "../media/timer15.png";
import timer30 from "../media/timer30.png";
import timer45 from "../media/timer45.png";
import timer60 from "../media/timer60.png";
import timer2hr from "../media/timer2hr.png";
import bread from "../icons/bread.png";
import muffin from "../icons/muffin.png";
import fish from "../icons/fish.png";
import milk from "../icons/milk.png";
import spices from "../icons/spices.png";
import cheese from "../icons/cheese.png";
import steak from "../icons/steak.png";
import chicken from "../icons/chicken.png";
import ethnic from "../icons/ethnic.png";
import banana from "../icons/banana.png";


initializeDB();

const FrontPage = () => {
    // TODO: replace it with Spoonacular API response?
    const cuisineMockData = [
        {
            name: "African"
        },
        {
            name: "American"
        },
        {
            name: "British"
        },
        {
            name: "Cajun"
        },
        {
            name: "Caribbean"
        },
        {
            name: "Chinese"
        },
        {
            name: "Eastern European"
        },
        {
            name: "European"
        },
        {
            name: "French"
        },
        {
            name: "German"
        },
        {
            name: "Greek"
        },
        {
            name: "Indian"
        },
        {
            name: "Italian"
        },
        {
            name: "Japanese"
        },
        {
            name: "Jewish"
        },
        {
            name: "Korean"
        },
        {
            name: "Latin American"
        },
        {
            name: "Mediterranean"
        },
        {
            name: "Mexican"
        },
        {
            name: "Middle Eastern"
        },
        {
            name: "Nordic"
        },
        {
            name: "Southern"
        },
        {
            name: "Spanish"
        },
        {
            name: "Thai"
        },
        {
            name: "Vietnamese"
        }
    ];

    const ingredientsImg = [
        {
            name: "bread",
            img: bread
        },
        {
            name: "muffin",
            img: muffin
        },
        {
            name: "banana",
            img: banana
        },
        {
            name: "fish",
            img: fish
        },
        {
            name: "milk",
            img: milk
        },
        {
            name: "spices",
            img: spices
        },
        {
            name: "steak",
            img: steak
        },
        {
            name: "chicken",
            img: chicken
        },
        {
            name: "cheese",
            img: cheese
        },
        {
            name: "ethnic",
            img: ethnic
        },
        {
            name: "cheese",
            img: cheese
        }
    ];
    const ingredients = [
        "Bread",
        "Produce",
        "Seafood",
        "Spices and Seasonings",
        "Milk, Eggs, or Other Dairy",
        "Oil, Vinegar, or Salad Dressing",
        "Cereal",
        "Baking Goods",
        "Health Foods",
        "Ethnic Foods",
        "Beverages",
        "Canned and Jarred"
    ];

    const prepTimeImg = [
        {
            name: "Less Than 30 Minutes",
            img: timer30
        },
        {
            name: "30 to 60 Minutes",
            img: timer45
        },
        {
            name: "60 Minutes or More",
            img: timer60
        }
    ];

    const [queryType, setQueryType] = useState("Name");
    let navigate = useNavigate();  

    return (
        <Fragment>
            <form
                id="form_search"
                name="form_search"
                method="get"
                action=""
                className="form-inline"
                onSubmit= {(event) =>{
                    event.preventDefault();
                    navigate("/recipes");    
                    window.location.search += "?type=" + queryType + "&data=" + document.getElementById("searchbar").value;
                }}
            >
                <div className="input-group" name="divcontainer">
                    <input
                        id="searchbar"
                        name="searchbar"
                        className="form-control"
                        placeholder="Search By..."
                        type="text"
                    />
                    <span className="input-group-btn">
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown" variant="success" id="dropdown-basic">
                                {queryType}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setQueryType("Name")}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => setQueryType("Cuisine")}>Cuisine</Dropdown.Item>
                                <Dropdown.Item onClick={() => setQueryType("Ingredients")}>Ingredients</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                </div>
            </form>
            <h4>CUISINE</h4>
            <div className="container-fluid">
                <div className="scrolling-wrapper row flex-row flex-nowrap py-2">
                    {cuisineMockData.map((cuisine, index) => (
                        <div className="col-2 my-col" key={index}>
                            <Link to={{
                                pathname: "/recipes",
                                search: "?type=cuisines&data=" + cuisine.name }}>
                                <img
                                    alt="100x100"
                                    src={MockPhoto}
                                    data-holder-rendered="true"
                                />
                                <p className="pt-2">{cuisine.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <h4>INGREDIENTS</h4>
            <div className="scrolling-wrapper row flex-row flex-nowrap py-2">
                <HorizontalScrollImg categoryList={ingredientsImg} type="ingredients"/>
            </div>
            <h4>PREP TIME</h4>
            <div className="scrolling-wrapper row flex-row flex-nowrap py-2">
                <HorizontalScrollImg categoryList={prepTimeImg} type="time"/>
            </div>
            <h4>FAVORITES</h4>
            <div className="scrolling-wrapper row flex-row flex-nowrap py-2">
                <HorizontalScrollImg categoryList={prepTimeImg} />
            </div>
        </Fragment>
    );
};

const HorizontalScroll = (props) => {
    const { categoryList } = props;

    return categoryList.map((category, index) => (
        <div className="col-2 my-col" key={index}>
            <Link to= {{
                pathname: "/recipes",
                search: "?type=" + props.type + "&data=" + category}}>
                <img height="100px" width="100px"
                    alt="100x100"
                    src={MockPhoto}
                    data-holder-rendered="true"
                />
                <p className="pt-2">{category}</p>
            </Link>
        </div>
    ));
};

const HorizontalScrollImg = (props) => {
    const { categoryList } = props;

    return categoryList.map((category, index) => (
        <div className="col-2 my-col" key={index}>
            <Link to= {{
                pathname: "/recipes",
                search: "?type=" + props.type + "&data=" + category.name}}>
                <img
                    alt="100x100"
                    src={category.img}
                    data-holder-rendered="true"
                />
                <p className="pt-2">{category.name}</p>
            </Link>
        </div>
    ));
};

const RowOfCards = (props) => {

    return props.mockData ? (
        <div className="row row-cols-3">
            {props.mockData.map((recipe) => (
                <div className="col mb-4">
                    <div className="card">
                        <Link to={{
                            pathname: "/recipe",
                            search: "?type=" + recipe.id}}>
                            <img
                                src={recipe.image}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <div className="card-title-box">
                                    <h5 className="card-title">{recipe.title}</h5>
                                </div>
                                <div className="text-box">
                                    <p className="card-text">{recipe.cuisines[0]}</p>
                                    <p className="card-text">{recipe.readyInMinutes} Minutes</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        ""
    );
};

export default FrontPage;
