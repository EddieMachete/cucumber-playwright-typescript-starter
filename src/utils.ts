import { PNG, PNGWithMetadata } from "pngjs";
import { readFile } from 'fs';

export async function loadImage(path: string): Promise<PNGWithMetadata | null> {
    return new Promise(
        (resolve, reject) => {
            readFile(
                path,
                (error, data) => {
                    if (error) {
                        resolve(null);
                    } else {
                        const image = PNG.sync.read(data);
                        resolve(image);
                    }
                }
            );
        }
    );
}
