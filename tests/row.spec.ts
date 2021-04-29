import {Row}  from '../src/templates';

describe('The Row function', () => {
    it('Array to row', () => {
        const expectedResult = `
        <row r="1" spans="1:3" x14ac:dyDescent="0.2">
            <c r="A1" t="inlineStr"><is><t>test</t></is></c>
			<c r="C1" t="n"><v>123</v></c>
        </row>`;
        const input = ['test', null,123];
        const result = Row(0,input);
        expect(result).toEqualXML(expectedResult);
    })
})