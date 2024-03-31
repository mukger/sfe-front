export const downloadJsonFile = () => {
    const jsonData = { 
        "kloc": "100",
        "projectMode": "Organic",
        "prodAtrMatrix": [
            [0, 0, 1, 0, 0, undefined],
            [undefined, 0, 1, 0, 0, undefined], 
            [0, 0, 1, 0, 0, 0]
        ],
        "hwAtrMatrix": [
            [undefined, undefined, 1, 0, 0, 0],
            [undefined, undefined, 1, 0, 0, 0],
            [undefined, 0, 1, 0, 0, undefined],
            [undefined, 0, 1, 0, 0, undefined]
        ],
        "persAtrMatrix": [
            [0, 0, 1, 0, 0, undefined], 
            [0, 0, 1, 0, 0, undefined],
            [0, 0, 1, 0, 0, undefined], 
            [0, 0, 1, 0, undefined, undefined], 
            [0, 0, 1, 0, undefined, undefined]
        ],
        "projAtrMatrix": [
            [0, 0, 1, 0, 0, undefined],
            [0, 0, 1, 0, 0, undefined],
            [0, 0, 1, 0, 0, undefined]
        ]
    };
    const jsonStr = JSON.stringify(jsonData, null, 2);
    
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.json';
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};