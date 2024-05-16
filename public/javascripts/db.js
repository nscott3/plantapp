async function postData(url = '', data = {}) {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });
    return response.json();
}

function base64ToFile(base64) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const blob = new Blob([byteArray], {type: mimeType});
    // Extract the file extension from the MIME type
    const fileExtension = mimeType.split('/')[1];
    return new File([blob], "photo." + fileExtension, {type: mimeType});
}

function jsonToFormData(json) {
    let formData = new FormData();
    formData.append('dateTimeSeen', json.dateTimeSeen);
    formData.append('location[type]', json.location.type);
    formData.append('location[latitude]', json.location.coordinates[0]);
    formData.append('location[longitude]', json.location.coordinates[1]);
    formData.append('description', json.description);
    formData.append('plantSize[height]', json.plantSize.height);
    formData.append('plantSize[spread]', json.plantSize.spread);
    formData.append('plantCharacteristics[hasFlowers]', json.plantCharacteristics.hasFlowers);
    formData.append('plantCharacteristics[hasLeaves]', json.plantCharacteristics.hasLeaves);
    formData.append('plantCharacteristics[hasFruitsOrSeeds]', json.plantCharacteristics.hasFruitsOrSeeds);
    formData.append('plantCharacteristics[sunExposure]', json.plantCharacteristics.sunExposure);
    formData.append('plantCharacteristics[flowerColor]', json.plantCharacteristics.flowerColor);
    formData.append('identification[name]', json.identification.name);
    formData.append('identification[status]', json.identification.status);
    formData.append('userNickname', json.userNickname);
    formData.append('photo', json.photo);
    return formData;
}