'use strict';

import * as fs from 'fs';
import * as path from 'path';
import sourceMap from 'source-map';
import { expect, test } from 'vitest'

test('make-file-back', async function () {
 const relativePath = '.vite/build/utilityCode.js';
  // const writepath='./tmp/example.ts'
  const absolutePath = path.resolve(relativePath);
  // // console.log(absolutePath)
  // fs.readFile(absolutePath, 'utf8', async (err, data) => {
  //   if (err) return console.error(err);

  //   const sourceMapData = data.split('//# sourceMappingURL=data:application/json;base64,')[1];
  //   const buff = new Buffer.from(sourceMapData, 'base64');
  //   const rawSourceMap = buff.toString('ascii');
  //   const consumer = new sourceMap.SourceMapConsumer(rawSourceMap);
  //   // const position = consumer.originalPositionFor({
  //   //   line: line,
  //   //   column: column
  //   // });
  //   // console.log(position);
  //   fs.writeFile(writepath, consumer.sourcesContent, function (err) {
  //     if (err) return console.log(err);
  //   });

  //   consumer.destroy();

  // });
await findOriginalPosition(absolutePath, 4, 8984);
},500000)


async function findOriginalPosition(minifiedFile, line, column) {
  const rawSourceMap = JSON.parse(fs.readFileSync(`${minifiedFile}.map`, 'utf8'));
  const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  console.log(consumer.sourcesContent)
  const position = consumer.originalPositionFor({
    line: line,
    column: column
  });

  console.log(position);
  consumer.destroy();
}