"use client";
import { Box, Button, Field, HStack, Input, Text, VStack, IconButton } from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import {
  FileUploadRoot,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi"
import { RiArrowRightLine } from "react-icons/ri"

function StoryCreateTop({
    handleCreateQuestion,
    nazos
}: {
    handleCreateQuestion: () => void;
    nazos: {
        id: number;
        description: string;
        image: null;
        answer: string;
        hint1: string;
        hint2: string;
        hint3: string;
        area: {
            longitude: number;
            latitude: number;
            radius: number;
        };
    }[];
}) {
    return (
        <Box>
            <Text textStyle="2xl">謎解き作成</Text>
            <VStack>
                {/* <Field.Root>
                    <Field.Label>タイトル</Field.Label>
                    <Field.HelperText>ストーリータイトルを入力してください</Field.HelperText>
                    <Field.ErrorText>タイトルが入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="ストーリータイトル" />
                </Field.Root> */}
                <Field.Root required>
                    <Field.Label>
                        タイトル
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Field.ErrorText>タイトルが入力されていません</Field.ErrorText>
                    <Input placeholder="ストーリータイトル" />
                </Field.Root>
                {/* <Field.Root>
                    <Field.Label>画像</Field.Label>
                    <Field.HelperText>ストーリーの画像を選択してください</Field.HelperText>
                    <Field.ErrorText>画像が選択されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input type="file" />
                </Field.Root> */}
                <FileUploadRoot > {/* maxFiles={5} */}
                  <FileUploadTrigger asChild>
                      <Button variant="outline" w="full" color = "black" fontWeight="bold">  {/* size="sm" */}
                      <HiUpload /> 画像アップロード
                      </Button>
                  </FileUploadTrigger>
                  <FileUploadList showSize clearable />
                </FileUploadRoot>

                {/* <Field.Root>
                    <Field.Label>所要時間(参考)</Field.Label>
                    <Field.HelperText>ストーリーの所要時間を入力してください</Field.HelperText>
                    <Field.ErrorText>所要時間が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="分" />
                </Field.Root> */}
                <Field.Root required>
                    <Field.Label>
                        所要時間(参考)
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <Field.ErrorText>所要時間が入力されていません</Field.ErrorText>
                    <Input placeholder="  分" />
                </Field.Root>
                <VStack>
                    {/* ここに問い${index}を表示 */}
                    {nazos.map((nazo) => (
                        // <HStack
                        //     key={nazo.id}
                        //     borderWidth="1px"
                        //     borderRadius="lg"
                        //     p={2}
                        //     onClick={() => handleCreateQuestion()}
                        // >
                        //     <Text>問い {nazo.id}</Text>
                        // </HStack>
                        <Button colorPalette="gray" 
                                variant="outline"
                                color = "black"
                                w="full"  // 横幅を最大にする
                                key={nazo.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                p={2}
                                onClick={() => handleCreateQuestion()}>
                          問い {nazo.id} <RiArrowRightLine />
                        </Button>
                    ))}
                    {/* <Button onClick={() => handleCreateQuestion()}>問題を追加する</Button>  */}
                    <IconButton aria-label="Add" color = "black" variant="outline" onClick={() => handleCreateQuestion()}>
                      <FaPlus />
                    </IconButton>
                </VStack>
                <VStack>
                    <Button
                        colorPalette="green"
                        minW="200px"
                    >
                        投稿
                    </Button>
                    <Button
                        colorPalette="green"
                        variant="outline"
                        color = "green"
                        minW="200px"
                    >
                        下書き保存
                    </Button>
                    <Button
                        colorPalette="red"
                        minW="200px"
                    >
                        削除
                    </Button>
                </VStack>
            </VStack>
        </Box>
    )
}

function QuestionPage({
    setPageState,
}: {
    setPageState: Dispatch<string>;
    questions: unknown[];
    setQuestions: Dispatch<{
        id: number;
        description: string;
        image: null;
        answer: string;
        hint1: string;
        hint2: string;
        hint3: string;
        area: {
            longitude: number;
            latitude: number;
            radius: number;
        };
    }[]>;
}) {
    return (
        <Box>
            <Button onClick={() => setPageState("/")}>←戻る</Button>
            <Text textStyle="2xl">問題作成</Text>
            <VStack>
                <Field.Root>
                    <Field.Label>問題</Field.Label>
                    <Field.HelperText>問題文を入力してください</Field.HelperText>
                    <Field.ErrorText>問題文が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="問題文" />
                </Field.Root>
                <Field.Root>
                    <Field.Label>画像</Field.Label>
                    <Field.HelperText>問題の画像を選択してください</Field.HelperText>
                    <Field.ErrorText>画像が選択されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input type="file" />
                </Field.Root>
                <Field.Root>
                    <Field.Label>答え</Field.Label>
                    <Field.HelperText>問題の答えを入力してください</Field.HelperText>
                    <Field.ErrorText>答えが入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="答え" />
                </Field.Root>
                <Field.Root>
                    <Field.Label>ヒント1</Field.Label>
                    <Field.HelperText>問題のヒント1を入力してください</Field.HelperText>
                    <Field.ErrorText>ヒント1が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="ヒント1" />
                </Field.Root>
                <Field.Root>
                    <Field.Label>ヒント2</Field.Label>
                    <Field.HelperText>問題のヒント2を入力してください</Field.HelperText>
                    <Field.ErrorText>ヒント2が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="ヒント2" />
                </Field.Root>
                <Field.Root>
                    <Field.Label>ヒント3</Field.Label>
                    <Field.HelperText>問題のヒント3を入力してください</Field.HelperText>
                    <Field.ErrorText>
                        ヒント3が入力されていません
                    </Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="ヒント3" />
                </Field.Root>
                <Field.Root>
                    {/* ここはmaplayoutの地図のclickEventとかを取るのでFieldとかはつかわない */}
                    <Field.Label>場所</Field.Label>
                    <Field.HelperText>問題の場所を入力してください</Field.HelperText>
                    <Field.ErrorText>場所が入力されていません</Field.ErrorText>
                    <Field.RequiredIndicator />
                    <Input placeholder="場所" />
                </Field.Root>
            </VStack>
        </Box>
    )
}

export default function NazoCreatePage() {
    const [pageState, setPageState] = useState("/");
    const [questions, setQuestions] = useState([{
        id: 1, // mapの色々対策(削除時のアレ)のため、連番で付与していく
        description: "謎解きの説明",
        image: null,
        answer: "謎解きの答え",
        hint1: "ヒント1",
        hint2: "ヒント2",
        hint3: "ヒント3",
        area: {
            longitude: 135,
            latitude: 34,
            radius: 100, //m
        }
    }]);  // TODO: 型は後でちゃんと書く @/types とかに
    
    if (pageState === "/") {
        return (
            <>
                <StoryCreateTop
                    handleCreateQuestion={() => setPageState("/create/question")}
                    nazos={questions}
                />
            </>
        );
    } else if (pageState === "/create/question") {
        return (
            <>
                <QuestionPage
                    setPageState={setPageState}
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </>
        );
    } else {
        return (
            <Text>404</Text>
        );
    }
}