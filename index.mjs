import fs from "fs/promises";

let myUsers = [];
let idSet = new Set();

function init() {
    myDir("LEADS")
        .then(() => console.log('Got the directory, computing...'))
} init()

async function myDir(dir) {
    try {
        console.log("The process has started")
        let files = await fs.readdir(`./${dir}`);
        for (let file of files) {
            (async () => {
                let data = await fs.readFile(`./${dir}/${file}`, 'utf-8');
                const splitArr = data.split("\r\n")
                for (let i = 0; i < splitArr.length; i++) {
                    const arr = splitArr[i].split(",");
                    const id = arr[0];
                    const fullName = arr[1].slice(1,arr[1].length - 1);
                    const fb = arr[2];

                    if (!idSet.has(id)) {
                        idSet.add(id);
                        myUsers.push({ id: id, full_name: fullName, facebook_mail: fb })
                    }

                }
                console.log(`You have collected : ${myUsers.length} people.`);
                fs.writeFile(`./results.json`, JSON.stringify(myUsers,null,2),"utf8");
            })()

        }

    }catch(error) {
        console.log(error);
    }
}


