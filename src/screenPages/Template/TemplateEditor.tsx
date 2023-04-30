import React, { useState } from 'react';
import parse, { attributesToProps } from 'html-react-parser';
import regexifyString from 'regexify-string';
import createDocument from "../hooks/createDocument";

interface TemplateEditorProps {
    template: string;
    onDocumentCreated: (createdDocument: any) => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({template, onDocumentCreated}: TemplateEditorProps) => {
    const result = regexifyString({
        pattern: /\[.*?\]/gim,
        decorator: (match, index) => {
            return `<input name={${match}} />`;
        },
        input: template,
    });

    const [form, setForm] = useState<Record<string, string>>({});

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const options = {
        replace: (domNode: any) => {
            if (domNode.attribs && domNode.name === 'input') {
                const props = attributesToProps(domNode.attribs);
                const newName = props.name.slice(2, -2);
                return (
                    <input
                        name={newName}
                        value={form[newName] ? form[newName] : ''}
                        onChange={onChangeInput}
                    />
                );
            }
        },
    };
    const handleSave = async () => {
        const populatedDescription = regexifyString({
            pattern: /\[.*?\]/gim,
            decorator: (match) => {
                const key = match.slice(1, -1);
                return form[key] || '';
            },
            input: template,
        }).join('');
        
        const titleMatch = populatedDescription.match(/<p>от (.*?)<\/p>/);
        const title = titleMatch ? titleMatch[1] : '';

        const description = populatedDescription.replace(/<p>от .*?<\/p>/, '');

        const documentData = {
            title: title,
            description: description,
        };

        const createdDocument = await createDocument(documentData);
        onDocumentCreated(createdDocument);
    };

    return (<>
        {parse(result.join(''), options)}
        <button onClick={handleSave}>Сохранить</button>
    </>);
};

export default TemplateEditor;
