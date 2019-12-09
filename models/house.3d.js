/*
    * This is the first prototype design for a 
    * 3D house model with bounding walls on 5 
    * faces. 
    * 
    * Author: 0c0ol
    * Date: 12/04/19
*/

const geometry = new THREE.BoxBufferGeometry(3, 3,5);
const material = new THREE.MeshBasicMaterial({ color: 0xa9a9a9 });
const cube = new THREE.Mesh(geometry, material);

//cube.rotateY(90);

// cut
const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

const globalPlanes =[globalPlane];
const EMPTY = Object.freeze([]);
