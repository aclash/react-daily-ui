let keywords = ["cat + dog", "horse - hay", "sky - blue + crazy - sunset"];
let testStrArr = ["my cat",
"my cat loves my dog",
"my horse loves my dog",
"my cat loves my horse",
"my cat and dog like hay",
"my horse doesn't like hay",
"my cat and dog and horse like hay",
"the sky is blue",
"the sky is crazy"
];
function isMatch(keywords, testStr){
    for (let i = 0; i < keywords.length; ++i){
        let keywordArry = keywords[i].split(" ");
        let setAdd = new Set();
        let setMinus = new Set();
        for (let j = 0; j < keywordArry.length; ++j){
            if (j == 0)
                setAdd.add(keywordArry[0]);
            else{
                if (j % 2 == 1 && keywordArry[j] == "+")
                    setAdd.add(keywordArry[j + 1]);
                else if (j % 2 == 1 && keywordArry[j] == "-")
                    setMinus.add(keywordArry[j + 1]);
            }
        }
        let flag = 0;
        let testArray = testStr.split(" ");
        for (let k = 0; k < testArray.length; ++k){
            if (!setAdd.has(testArray[k]) && !setMinus.has(testArray[k]))
                continue;
            if (!setAdd.has(testArray[k]) || setMinus.has(testArray[k])){
                flag = -1;
                break;
            }
            ++flag;
        }
        if (flag == setAdd.size)
            return true;
        setAdd.clear();
        setMinus.clear();
    }
    return false;
}
for (let i = 0; i < testStrArr.length; ++i)
    console.log(isMatch(keywords, testStrArr[i]));
