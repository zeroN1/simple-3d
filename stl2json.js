// converts stl to json

const fs = require('fs').promises;
const path = require('path');
const STLParser = require('parse-stl-binary');

const buffGeometry = {}; // the complete model object 

// = './sample_stl/Cube_3d_printing_sample.stl'
async function parse(modelFile) {
    // assume the file exists
    const stlSrc = await fs.readFile(modelFile);
    const model = STLParser(stlSrc);

    //console.dir(model);
    console.log(`Cells Length: ${model.cells.length}`);
    console.log(`Positions Length: ${model.positions.length}`);
    console.log(`FaceNormals Length: ${model.faceNormals.length}`);

    buffGeometry.data.attributes.position = {
        itemSize: 3,
        type: "Float32Array",
        array: model.positions
    };
    buffGeometry.data.attributes.normal = {
        itemSize: 3,
        type: "Float32Array",
        array: model.faceNormals
    };
    buffGeometry.data.attributes.uv = {
        itemSize: 2,
        type: "Float32Array",
        array: [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]
    };
    buffGeometry.faces = model.faceNormals;
    buffGeometry.vertices = model.positions;

}
function setupModel() {
    buffGeometry.metadata = {};
    buffGeometry.metadata.formatVersion = 3;
    buffGeometry.metadata.type = "BufferGeometry";
    buffGeometry.metadata.generator = "BufferGeometryExporter";
    buffGeometry.data = {};
    buffGeometry.data.attributes = {};
    buffGeometry.data.boundingSphere = {
        center: [0, 0, 0],
        radius: 86.602
    };
}
try {
    (async () => {
        setupModel();
        await parse(path.resolve('./sample_stl/Cube_3d_printing_sample.stl'));
        await fs.writeFile(path.resolve('./models/cube-model.json'), JSON.stringify(buffGeometry), { encoding: 'utf8', mode: 777, flag: 'w+' });
    })();
} catch(runErr) {
    console.log('[!] Fatal Error. Terminating...');
    console.error(runErr);
}
