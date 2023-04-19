const pageAmount = 7;
const questionAmount = 4;

let page1 = {
    question1: {
        bucket: "Maintain day-to-day activities",
        value: 0,
        bucketValue: "maintain_day_to_day_activities"
    },
    question2: {
        bucket: "Avoid becoming more dependant on others",
        value: 0,
        bucketValue: "avoid_dependence"
    },
    question3: {
        bucket: "Avoid high financial costs",
        value: 0,
        bucketValue: "avoid_high_costs"
    },
    question4: {
        bucket: "Avoid long term side effects",
        value: 0,
        bucketValue: "avoid_long_term_side_effects"
    }
}

let page2 = {
    question1: {
        bucket: "Avoid hospitalizations and increase time at home",
        value: 0,
        bucketValue: "avoid_hospitalization"
    },
    question2: {
        bucket: "Avoid high financial costs",
        value: 0,
        bucketValue: "avoid_high_costs"
    },
    question3: {
        bucket: "Living longer",
        value: 0,
        bucketValue: "living_longer"
    },
    question4: {
        bucket: "Avoid becoming more dependent on others",
        value: 0,
        bucketValue: "avoid_dependence"
    }
}

let page3 = {
    question1: {
        bucket: "Avoid long-term side effects",
        value: 0,
        bucketValue: "avoid_long_term_side_effects"
    },
    question2: {
        bucket: "Living longer",
        value: 0,
        bucketValue: "living_longer"
    },
    question3: {
        bucket: "Maintain day-to-day activities",
        value: 0,
        bucketValue: "maintain_day_to_day_activities"
    },
    question4: {
        bucket: "Avoid hospitalizations/increase time at home",
        value: 0,
        bucketValue: "avoid_hospitalization"
    }
}

let page4 = {
    question1: {
        bucket: "Avoid high financial costs",
        value: 0,
        bucketValue: "avoid_high_costs"
    },
    question2: {
        bucket: "Avoid long-term side effects",
        value: 0,
        bucketValue: "avoid_long_term_side_effects"
    },
    question3: {
        bucket: "Avoid hospitalizations/increase time at home",
        value: 0,
        bucketValue: "avoid_hospitalization"
    },
    question4: {
        bucket: "Avoid short-term side effects",
        value: 0,
        bucketValue: "avoid_short_term_effects"
    }
}

let page5 = {
    question1: {
        bucket: "Avoid short-term side effects",
        value: 0,
        bucketValue: "avoid_short_term_effects"
    },
    question2: {
        bucket: "Avoid hospitalizations/increase time at home",
        value: 0,
        bucketValue: "avoid_hospitalization"
    },
    question3: {
        bucket: "Avoid becoming more dependent on others",
        value: 0,
        bucketValue: "avoid_dependence"
    },
    question4: {
        bucket: "Maintain day-to-day activities",
        value: 0,
        bucketValue: "maintain_day_to_day_activities"
    }
}

let page6 = {
    question1: {
        bucket: "Avoid becoming more dependent on others",
        value: 0,
        bucketValue: "avoid_dependence"
    },
    question2: {
        bucket: "Avoid short-term side effects",
        value: 0,
        bucketValue: "avoid_short_term_effects"
    },
    question3: {
        bucket: "Avoid long-term side effects",
        value: 0,
        bucketValue: "avoid_long_term_side_effects"
    },
    question4: {
        bucket: "Living longer",
        value: 0,
        bucketValue: "living_longer"
    }
}

let page7 = {
    question1: {
        bucket: "Living longer",
        value: 0,
        bucketValue: "living_longer"
    },
    question2: {
        bucket: "Maintain day-to-day activities",
        value: 0,
        bucketValue: "maintain_day_to_day_activities"
    },
    question3: {
        bucket: "Avoid short-term side effects",
        value: 0,
        bucketValue: "avoid_short_term_effects"
    },
    question4: {
        bucket: "Avoid high financial costs",
        value: 0,
        bucketValue: "avoid_high_costs"
    }
}

let buckets = {
    living_longer: 0,
    maintain_day_to_day_activities: 0,
    avoid_high_costs: 0,
    avoid_short_term_effects: 0,
    avoid_long_term_side_effects: 0,
    avoid_dependence: 0,
    avoid_hospitalization: 0
}

function updateBuckets() {
    for (let pages = 0; pages < pageAmount; pages++) {
        const pageNumber = pages + 1;
        for (let questionNumber = 0; questionNumber < questionAmount; questionNumber++) {
            const question = Object.keys(getPage(pageNumber))[questionNumber];
            const questionValue = getQuestionValue(pageNumber, questionNumber);
            const bucketValue = getPage(pageNumber)[question].bucketValue;
            buckets[bucketValue] += questionValue;
        }
    }
    console.log(buckets);
}

// function testingBuckets() {
//     console.log(buckets[page7.question1.bucketValue]);
// }

function getPage(number) {
    switch(number) {
        case 1:
            return page1;
        case 2:
            return page2;
        case 3:
            return page3;
        case 4:
            return page4;
        case 5:
            return page5;
        case 6:
            return page6;
        case 7:
            return page7;
        default:
            return page1;
    }
}

function getQuestionValue(pageNumber, questionNumber) {
    const question = Object.keys(getPage(pageNumber))[questionNumber]; // "question1", "question2", etc.
    return getPage(pageNumber)[question].value;
}

function setQuestionValue(pageNumber, row, questionValue) {
    if (questionValue > 1 || questionValue < -1) {
        console.log("number not valid for value");
        return console.error();
    }
    console.log(row);
    if (row === "row1") {
        console.log("got to row1");
        const question1 = Object.keys(getPage(pageNumber))[0]; // "question1", "question2", etc.
        getPage(pageNumber)[question1].value = questionValue;
    } else if (row === "row2") {
        console.log("got to row2");
        const question2 = Object.keys(getPage(pageNumber))[1]; // "question1", "question2", etc.
        getPage(pageNumber)[question2].value = questionValue;
    } else if (row === "row3") {
        console.log("got to row3");
        const question3 = Object.keys(getPage(pageNumber))[2]; // "question1", "question2", etc.
        getPage(pageNumber)[question3].value = questionValue;
    } else if (row === "row4") {
        console.log("got to row4");
        const question4 = Object.keys(getPage(pageNumber))[3]; // "question1", "question2", etc.
        getPage(pageNumber)[question4].value = questionValue;
    } else {
        console.error();
    }
}

function clearQuestionValue(pageNumber, row) {
    setQuestionValue(pageNumber, row, 0);
}

module.exports = {getPage, getQuestionValue, setQuestionValue, clearQuestionValue, pageAmount, updateBuckets, buckets};