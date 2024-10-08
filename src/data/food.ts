export type IFoodData = {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

const createData = (
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): IFoodData => ({ name, calories, fat, carbs, protein });

export const foodData = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];