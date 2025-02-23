import * as turf from '@turf/turf';

export const getDistanceByTwoPoints = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const from = turf.point([lon1, lat1]);
    const to = turf.point([lon2, lat2]);
    return turf.distance(from, to, { units: 'metres' });
}