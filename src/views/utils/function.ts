//split array into groups
export function SplitArrayIntoGroups<Type>(array: Type[], groupSize: number):Type[][] {
        let groups:Type[][] = [];
        for (let i = 0; i < array.length; i += groupSize) {
            // array.slice(i, i + groupSize)
            groups.push(array.slice(i, i + groupSize));
        }
        return groups;
}
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
