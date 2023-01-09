import {
    writeDataToDatabase,
    isDataAdded,
    deleteDataFromDatabase,
    isDataDelted
} from '../../firebase'

describe('Firesbase RealtimeDatabase data management', () => {
    test('Data added to RealtimeDatabase', () => {
        writeDataToDatabase(
            'test',
            'Ajin',
            '13,99$',
            'Yumi Lee',
            'VIZ',
            'English',
            '200',
            '0999652',
            'Description Here',
            'test@test.id',
            'https://www.fujidream.lt/wp-content/uploads/2021/10/91pRfQnykVL-768x1075.jpg'
        );
        expect(isDataAdded()).toBe(true)
    })
}, 5000)

describe('Firesbase RealtimeDatabase data management', () => {
    test('Data deleted from RealtimeDatabase', () => {
        deleteDataFromDatabase('test')
        expect(isDataDelted()).toBe(true)
    })
}, 5000)
