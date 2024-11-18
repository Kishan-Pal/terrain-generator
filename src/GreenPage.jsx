import { useState, useEffect, useRef } from "react";
import Tile from "./TileClass";
import image1 from "./images/1.jpeg";
import image2 from "./images/2.jpeg";
import image3 from "./images/3.jpeg";
import image4 from "./images/4.jpeg";
import image5 from "./images/5.jpeg";
import image6 from "./images/6.jpeg";
import image7 from "./images/7.jpeg";
import image8 from "./images/8.jpeg";
import image9 from "./images/9.jpeg";
import image10 from "./images/10.jpeg";
import image11 from "./images/11.jpeg";
import image12 from "./images/12.jpeg";
import image13 from "./images/13.jpeg";

// ! add image in folder,
// ! import image,
// ! add to the connectors state,
// ! imageArray.push
// ! increment imageCount;

const viewPort = 500;
const imageCount = 13;
const delay = 50;
var end = false;

const GreenPage = () => {
  const input = useRef();
  const [grid, setGrid] = useState(25);
  const [imageArray, setImageArray] = useState([]);
  const [gridArray, setGridArray] = useState();
  const [connectors, setConnectors] = useState({
    1: ["aaa", "aaa", "aaa", "aaa"],
    2: ["aba", "aba", "aaa", "aba"],
    3: ["aaa", "aaa", "aba", "aba"],
    4: ["aba", "aaa", "aaa", "aba"],
    5: ["aaa", "aba", "aaa", "aba"],
    6: ["aba", "aaa", "aba", "aba"],
    7: ["aba", "aba", "aba", "aaa"],
    8: ["aaa", "aba", "aba", "aba"],
    9: ["aba", "aaa", "aaa", "aba"],
    10: ["aba", "aba", "aaa", "aaa"],
    11: ["aba", "aaa", "aba", "aaa"],
    12: ["aba", "aba", "aba", "aaa"],
    13: ["aaa", "aba", "aba", "aaa"],
  });

  useEffect(() => {
    imageArray.push(null);
    imageArray.push(image1);
    imageArray.push(image2);
    imageArray.push(image3);
    imageArray.push(image4);
    imageArray.push(image5);
    imageArray.push(image6);
    imageArray.push(image7);
    imageArray.push(image8);
    imageArray.push(image9);
    imageArray.push(image10);
    imageArray.push(image11);
    imageArray.push(image12);
    imageArray.push(image13);
    setImageArray([...imageArray]);
    // console.log(imageArray);

    const array = new Array(grid)
      .fill()
      .map(() => new Array(grid).fill(null).map(() => new Tile(imageCount)));
    //console.table(array);
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        array[i][j].row = i;
        array[i][j].col = j;
      }
    }
    // array[1][1].image = imageArray[2];
    // array[1][1].isCollapsed = true;
    // array[1][1].imageNumber = 6;
    setGridArray(array);

    // if (gridArray !== undefined) {
    //   console.log(gridArray);
    //   let newArray = gridArray?.flat();
    //   if (newArray !== undefined) {
    //     newArray[3].possibilities[0] = 3;
    //     newArray[4].possibilities[0] = 4;
    //     newArray = newArray.filter((item) => !item.isCollapsed);
    //     newArray.sort((a, b) => a.possibilities[0] - b.possibilities[0]);
    //     newArray.forEach((item) =>
    //       console.log(
    //         item.possibilities[0] + " => " + item.row + " " + item.col
    //       )
    //     );
    //   }
    // }
  }, []);

  // useEffect(() => {}, [grid]);

  // useEffect(() => {
  //   // ! console.log(gridArray);
  //   // !  console.log("Hi");
  // }, [gridArray]);

  const collapse = (row, col, imageNo) => {
    if (imageNo === undefined) {
      console.log("skipping");
      gridArray[row][col].isCollapsed = true;
      return;
    }
    // console.log(imageArray[imageNo]);
    // console.log(gridArray);
    if (gridArray !== undefined) {
      //!     console.log("collapsed " + row + ", " + col + " to " + imageNo);
      gridArray[row][col].image = imageArray[imageNo];
      gridArray[row][col].isCollapsed = true;
      gridArray[row][col].imageNumber = imageNo;

      // see up
      if (row > 0 && !gridArray[row - 1][col].isCollapsed) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row - 1][col].possibilities[i] === 1) {
            if (notEqual(connectors[i][2], connectors[imageNo][0])) {
              gridArray[row - 1][col].possibilities[i] = 0;
              gridArray[row - 1][col].possibilities[0] -= 1;
            }
          }
        }
      }

      // see right
      if (col < grid - 1) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row][col + 1].possibilities[i] === 1) {
            if (notEqual(connectors[i][3], connectors[imageNo][1])) {
              gridArray[row][col + 1].possibilities[i] = 0;
              gridArray[row][col + 1].possibilities[0] -= 1;
            }
          }
        }
      }

      // see down
      if (row < grid - 1) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row + 1][col].possibilities[i] === 1) {
            if (notEqual(connectors[i][0], connectors[imageNo][2])) {
              gridArray[row + 1][col].possibilities[i] = 0;
              gridArray[row + 1][col].possibilities[0] -= 1;
            }
          }
        }
      }

      // see left
      if (col > 0) {
        for (let i = 1; i <= imageCount; i++) {
          if (gridArray[row][col - 1].possibilities[i] === 1) {
            if (notEqual(connectors[i][1], connectors[imageNo][3])) {
              gridArray[row][col - 1].possibilities[i] = 0;
              gridArray[row][col - 1].possibilities[0] -= 1;
            }
          }
        }
      }

      setGridArray([...gridArray]);
    } else console.log("undifined");
  };

  const notEqual = (str1, str2) => {
    str2 = str2.split("").reverse().join("");
    if (str1 === str2) return false;
    else return true;
  };

  const startCollapse = () => {
    if (gridArray !== undefined) {
      let newArray1 = gridArray.flat();
      let newArray = newArray1.filter((item) => !item.isCollapsed);
      if (newArray === undefined) return;
      newArray.sort((a, b) => a.possibilities[0] - b.possibilities[0]);
      let length = 0;
      newArray.forEach((item) => {
        length = length + 1;
        //!    console.log(item.possibilities[0] + " => " + item.row + " " + item.col);
      });
      if (length === 0) {
        console.log("end");
        end = true;
        return;
      }
      let tempNum = newArray[0].possibilities[0];
      if (tempNum === 0) {
        gridArray[newArray[0].row][newArray[0].col].isCollapsed = true;
      }
      let i;
      for (i = 0; i < length; i++) {
        if (newArray[i].possibilities[0] > tempNum) break;
      }
      let randNo = Math.floor(Math.random() * i);
      //!   console.log(
      //     "collapsing " + newArray[randNo].row + ", " + newArray[randNo].col
      //   );
      let tempPossibilities = new Array();
      for (let j = 1; j <= imageCount; j++) {
        if (newArray[randNo].possibilities[j] === 1) {
          tempPossibilities.push(j);
        }
      }
      if (tempPossibilities == []) return;
      //!     console.log(tempPossibilities);
      let randPossibility = Math.floor(
        Math.random() * newArray[randNo].possibilities[0]
      );
      let collapseChoice = tempPossibilities[randPossibility];
      // !     console.log("collapsing to choice " + collapseChoice);
      collapse(newArray[randNo].row, newArray[randNo].col, collapseChoice);
    } else console.log(undefined);
  };

  useEffect(() => {
    const time = setInterval(() => {
      if (end) clearInterval(time);
      input.current.click();
    }, delay);

    return () => clearInterval(time); // Correct way to clear the interval
  }, []);

  return (
    <>
      <div
        ref={input}
        className={`h-[${viewPort}px] w-[${viewPort}px] `}
        onClick={() => startCollapse()}
      >
        {gridArray?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex w-full bg-black-400`}
            style={{ height: `${viewPort / grid}px` }}
          >
            {row.map((tile, colIndex) => (
              <div
                key={colIndex}
                className={`h-full bg-black text-[8px] text-center text-white`}
                style={{ width: `${viewPort / grid}px` }}
              >
                {tile.image !== null ? (
                  <img
                    src={tile.image}
                    alt={`Tile ${rowIndex}-${colIndex}`}
                    className="h-full w-full object-cover "
                  />
                ) : // tile.possibilities[0]
                null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
// #8fd82f

export default GreenPage;
