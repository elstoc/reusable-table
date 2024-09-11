type Animal = {
    name: string,
    numberOfLegs: number,
    hasTail: boolean,
    description: string
}

export const animalData: Animal[] = [
    {name: 'Dog', numberOfLegs: 4, hasTail: true, description: 'The dog is a domesticated descendant of the wolf'},
    {name: 'Ape', numberOfLegs: 2, hasTail: false, description: 'Apes are a clade of Old World simians native to sub-Saharan Africa and Southeast Asia'},
    {name: 'Kangaroo', numberOfLegs: 2, hasTail: true, description: 'Kangaroos are marsupials from the family Macropodidae'},
    {name: 'Spider', numberOfLegs: 8, hasTail: false, description: 'Spiders are air-breathing arthropods that have eight limbs'},
]