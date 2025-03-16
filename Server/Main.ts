interface Section {
    SectionName: string,
    SpecialBlockage: boolean,
    OccupyTrainNames: Array<string>,
}
interface Stab{
    StopName: string,
    Time: Number
}
interface Train {
    CurrentFormation: string,
    Stab: Array<Stab>
}
interface FormationState {
    Foward: Number,
    Bottom: Number
}
interface Formation {
    CurrentState: FormationState,
    
}