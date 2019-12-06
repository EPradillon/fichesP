export class Politique {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public professions: string[],
        public description: string,
        public imageUrl: string 
    ){}
}

export const politiques: Politique[] = [
    {
        "id": 'HR02',
        "firstName": "Henri",
        "lastName": "Joyeux",
        "professions": ['Banquier','Voleur'],
        "description": "Je suis un banquier qui aime la bourse",
        "imageUrl": "https://i.pravatar.cc/300",
    },
    {
        "id": 'MN04',
        "firstName": "Manny",
        "lastName": "Pacquaio",
        "professions": ['Boxeur','Député'],
        "description": "Je suis un boxueur qui aime la boxe",
        "imageUrl": "https://i.pravatar.cc/200",
    }
]
