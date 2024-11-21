function LineChar({data}){
    const min = Math.min(...data);
    const max = Math.max(...data);

    const width = 2048;
    const height = 1024;
    const deltax = width / (data.length-1);
    const deltay = height / (max - min);
    console.log(min + " " + max);
    return(
        <svg viewBox={`0 0 ${width} ${height}`} width="200" height="100">
        <polyline points={data.map((p,i) => `${i * deltax} ${Math.trunc((p- min) * deltay)}`)} strokeWidth="20" stroke="grey">
        
            </polyline>
        </svg>
    )
}

export default LineChar;